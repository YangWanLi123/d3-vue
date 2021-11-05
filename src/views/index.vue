<template>
  <div>
      <svg width="600" height="500"></svg>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return {
      d3_data: [73,52,33,22,14,68]
    }
  },
  mounted(){
    this.draw()
  },
  methods: {
    draw(){
      let _this=this;
      let margin=30;
      let svg=this.d3.select('svg');
      let {width,height}={width:svg.attr('width'),height: svg.attr('height')};
      //创建矩形分组
      let g=svg.append('g').attr('transform',`translate(${margin},${margin})`);//图表距离视口的左、上距离
      //定义x轴比例尺
      console.log(this.d3.range(this.d3_data.length))
      let scaleX=this.d3.scaleBand().domain(this.d3.range(this.d3_data.length)).range([0,width-margin*2]);
      //定义y轴比例尺
      let scaleY=this.d3.scaleLinear().domain([0,this.d3.max(this.d3_data)]).range([height-margin*2,0]);
      //绘制x y轴
      let axisX=this.d3.axisBottom(scaleX),axisY=this.d3.axisLeft(scaleY);
      g.append('g').attr('transform',`translate(0,${height-margin*2})`).call(axisX);
      g.append('g').attr('transform','translate(0,0)').call(axisY);
      //创建矩形分组
      let gs=g.selectAll('rect')
              .data(this.d3_data)
              .enter()
              .append('g');
      //绘制矩形+过渡效果
      let rectP=40;//柱状图间距
      gs.append('rect')
        .attr('x',function(d,i){return scaleX(i)+rectP/2})
        .attr('y',function(){
          return scaleY(scaleY.domain()[0])
        })
        .attr('width',function(){return scaleX.step()-rectP})
        .attr('height',function(){
          return 0
        })
        .attr('fill','pink')
        .transition()
        .duration(1500)
        .delay(function(d,i){
          return i*200
        })
        .attr('y',function(d){return scaleY(d)})
        .attr('height',function(d){
          return height-margin*2-scaleY(d)
        });
        gs.on('mouseover',function(){
          _this.d3.select(this.firstChild)
            .transition().duration(1000).delay(200).attr('fill','#306ade');
        });
        gs.on('mouseout',function(){
          _this.d3.select(this.firstChild)
            .transition().duration(1000).delay(200).attr('fill','pink');
        });
        gs.append('text')
        .attr('x',function(d,i){
          return scaleX(i)+rectP;
        })
        .attr('y',function(){
          return height-2*margin;
        })
        .attr('dx',function(){
          return -2;
        })
        .attr('dy',function(){
          return 20;
        })
        .text(function(d){
          return d;
        })
        .attr('fill','green')
        .transition().duration(1500).delay(function(d,i){
          return i*200
        })
        .attr('y',function(d){
          return scaleY(d);
        })
    }
  }
}
</script>
<style scoped>

</style>
