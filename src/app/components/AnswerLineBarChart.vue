<script setup>
import { ref, toRefs, watch, onMounted } from 'vue';
import * as d3 from 'd3';

const svgRef = ref(null);

const props = defineProps({
    top: { type: Number, default: 40 },
    right: { type: Number, default: 0 },
    bottom: { type: Number, default: 40 },
    left: { type: Number, default: 40 },
    barpadding: { type: Number, default: 0.05 },
    width: { type: Number, default: 900 },
    height: { type: Number, default: 400 },
    answers: { type: Array, default: () => [] },
});
const bars = ref([]);
const line = ref('');
const { top, right, bottom, left, width, height } = toRefs(props);

const update = ()=>{
    const {width, height, barpadding, answers} = props;
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

    const svg = d3.select(svgRef.value);

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
    bars.value = dataset
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
    line.value = d3.line().x(({cx})=>cx).y(({cy})=>cy).curve(d3.curveMonotoneX)(bars.value);
};
onMounted(update);
watch(()=>props.width, update);
watch(()=>props.height, update);
watch(()=>props.barpadding, update);
watch(()=>props.answers, update);
</script>

<template lang="pug">
svg.answer-line-bar-chart(:viewBox='`${-left} ${-top} ${- (-width - left - right)} ${-(-height - top - bottom)}`' ref='svgRef')
    g.axis.axis-x
    g.axis.axis-y
    g.bars
        g(v-for='({n, v, x, y, w, h, tx, ty, b}) in bars' :key='n' :win='b' :visibility='v==0?"hidden":"visible"')
            rect(:x='x' :y='y' :width='w' :height='h')
            text(:x='tx' :y='ty' :dy='`${!b?1:-0.2}em`') {{v}}
    g.line
        path(:d='line')
        g(v-for='({n, t, cx, cy, b}) in bars' :key='n' :win='b')
            circle(:cx='cx' :cy='cy' r='5')
            text(:x='cx' :y='cy' dy='-0.5em') {{t}}
</template>

<style lang="scss">
svg.answer-line-bar-chart {
    max-width: 100%;
    height: auto;
    text {
        font-size: 1.3em;
    }
    > g.bars > g {
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
    > g.bars text,
    > g.line text {
        pointer-events: none;
        font-weight: bold;
        fill: white;
        text-anchor: middle;
    }
    > g.axis text {
        fill: white;
    }
    > g.line {
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