<template>
    <svg :viewBox="`${-radius-padding} ${-radius-padding} ${-2*(-radius-padding)} ${-2*(-radius-padding)}`">
        <g><path v-for="({option, value, d}) in pie" :key="option" :d="d">
            <title>{{option}}: {{value}}人</title>
        </path></g>
        <g><text v-for="({option, t}) in pie" :key="option" :transform="`translate(${t})`">
            <tspan x="0" y="0.5em">{{option}}</tspan>
        </text></g>
    </svg>
</template>

<script>
import { watch } from 'vue';
import * as d3 from 'd3'
export default {
    props: {
        radius: { type: Number, default: 320 },
        innerRadius: { type: Number, default: 200 },
        padding: { type: Number, default: 10 },
        answers: { type: Array, default: () => [] },
    },
    data: () => ({
        pie: [],
    }),
    mounted() {
        watch(()=>this.answers, ()=>this.render());
        this.render();
    },
    methods: {
        render() {
            const {answers, radius, innerRadius} = this;
            const d = d3.arc().innerRadius(innerRadius).outerRadius(radius);
            const t = d.centroid;

            this.pie = d3.pie().value(({value}) => value)(answers)
                .map(v => ({...v.data, d: d(v), t: t(v)}));
        }
    }
}
</script>

<style lang="scss" scoped>
svg {
    max-width: 100%;
    height: auto;
    text {
        pointer-events: none;
        font-size: 4em;
        text-anchor: middle;
        tspan {
            &:first-child {font-weight: bold;}
            // &:last-child  {font-weight: bold;}
        }
    }
    path {
        &:nth-child(1)  {fill: #a88ccc;}
        &:nth-child(2)  {fill: #d98acf;}
        &:nth-child(3)  {fill: #b86a83;}
        &:nth-child(4)  {fill: #ffae91;}
        &:nth-child(5)  {fill: #eed482;}
        &:nth-child(6)  {fill: #cff69d;}
        &:nth-child(7)  {fill: #97faa4;}
        &:nth-child(8)  {fill: #77ecc8;}
        &:nth-child(9)  {fill: #7bcde8;}
        &:nth-child(10) {fill: #94a8e9;}
    }
}
</style>