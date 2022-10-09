<template>
    <svg :viewBox="`${-left} ${-top} ${- (-width - left - right)} ${-(-height - top - bottom)}`">
        <g class="axis axis-x"></g>
        <g class="axis axis-y"></g>
        <g class="bars">
            <g v-for="({n, v, x, y, w, h, tx, ty, b}) in bars"
                :key="n" :win="b"
                :visibility="v==0?'hidden':'visible'">

                <rect :x="x" :y="y" :width="w" :height="h" ></rect>
                <text :x="tx" :y="ty" :dy="`${!b?1:-0.2}em`">{{v}}</text>
            </g>
        </g>
        <g class="line">
            <path :d="line"></path>
            <g v-for="({n, t, cx, cy, b}) in bars" :key="n" :win="b">
                <circle :cx="cx" :cy="cy" r="5"></circle>
                <text :x="cx" :y="cy" dy="-0.5em">{{t}}</text>
            </g>
        </g>
    </svg>
</template>

<script>
import { watch, defineComponent } from 'vue';
import * as d3 from 'd3';

export default defineComponent({
    props: {
        top: { type: Number, default: 40 },
        right: { type: Number, default: 0 },
        bottom: { type: Number, default: 40 },
        left: { type: Number, default: 40 },
        barpadding: { type: Number, default: 0.05 },
        width: { type: Number, default: 900 },
        height: { type: Number, default: 400 },
        answers: { type: Array, default: () => [] },
    },
    data() {
        return {
            bars: [],
            line: '',
        };
    },
    mounted() {
        watch(()=>this.top, ()=>this.render());
        watch(()=>this.right, ()=>this.render());
        watch(()=>this.bottom, ()=>this.render());
        watch(()=>this.left, ()=>this.render());
        watch(()=>this.barpadding, ()=>this.render());
        watch(()=>this.width, ()=>this.render());
        watch(()=>this.height, ()=>this.render());
        watch(()=>this.answers, ()=>this.render());
        this.render();
    },
    methods: {
        render() {
            const {width, height, barpadding, answers} = this;
            let t = 0;
            const dataset = answers.map(({name, value})=>{
                t = Number((t + value).toFixed(2));
                return {name, value, total: t};
            });

            const xScale = d3.scaleBand()
                .rangeRound([0, 0+width])
                .padding(0+barpadding)
                .domain(dataset.map(({name})=>name));

            const ymin = d3.min(dataset, ({value, total})=>value>total?total:value);
            const ymax = d3.max(dataset, ({value, total})=>value>total?value:total);
            const ypadding = (ymax - ymin) * 0.02;
            const yScale = d3.scaleLinear()
                .rangeRound([0+height, 0])
                .domain([ymin - ypadding, ymax + ypadding]);

            const svg = d3.select(this.$el);

            // axis-x
            svg.select(".axis-x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .attr("font-family", null)
                .attr("font-size", null);

            // axis-y
            svg.select(".axis-y")
                .call(d3.axisLeft(yScale))
                .attr("font-family", null)
                .attr("font-size", null);

            const w = xScale.bandwidth();
            const bars = dataset
                .map(({name: n, value: v, total: t}) => ({
                    n, v, t, w,
                    x: xScale(n),
                    y: yScale(v>0?v:0),
                    h: Math.abs(yScale(Math.abs(v)) - yScale(0)),
                    cx: xScale(n) + w/2,
                    cy: yScale(t),
                    tx: xScale(n) + w/2,
                    ty: yScale(0),
                    b: v>=0,
                }));

            this.line = d3.line()
                .x(({cx})=>cx)
                .y(({cy})=>cy)
                .curve(d3.curveMonotoneX)
                (bars);

            this.bars = bars;
        }
    }
});
</script>


<style lang="scss">
svg {
    max-width: 100%;
    height: auto;
    text {
        font-size: 1.3em;
    }
    g {
        &[win="true"] {
            rect { fill: #2563b3; }
        }
        &[win="false"] {
            rect { fill: #cf5e5e; }
        }
        rect {
            transition: fill 300ms;
            &:hover {
                fill: #68c564;
                transition: fill 300ms;
            }
        }
    }
    .bars text,
    .line text {
        pointer-events: none;
        font-weight: bold;
        fill: white;
        text-anchor: middle;
    }
    .axis text {
        fill: white;
    }
    .line {
        path {
            pointer-events: none;
            fill: none;
            stroke: #fbb946;
            stroke-width: 3;
        }
        circle {
            fill: #fbb946;
            stroke: #fbb946;
            stroke-width: 3;
        }
        text {
            fill: orange;
            stroke: white;
            stroke-opacity: 0.6;
            stroke-width: 0.1;
        }
    }
}
</style>