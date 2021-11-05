<template>
  <div>
      <svg width="600" height="500"></svg>
  </div>
</template>

<script>
export default {
  name: 'SVGIndex',
  data(){
    return {
      nodes: [
        {id: 0,name: 'svg绘图',shape: 'root',type:'root',description: '定义SVG文档片段'},
        {id: 1,name: '形状',shape: 'text',type: 'shape',description:'预定义形状元素'},
        {id: 2,name: 'rect',shape: 'rect',type: 'shape',description:'定义矩形'},
        {id: 3,name: 'circle',shape: 'circle',type: 'shape',description:'定义圆形'},
        {id: 4,name: 'ellipse',shape: 'ellipse',type: 'shape',description:'定义椭圆'},
        {id: 5,name: 'line',shape: 'line',type: 'shape',description:'定义线条'},
        {id: 6,name: 'polygon',shape: 'polygon',type: 'shape',description:'创建含有不少于三个边的图形'},
        {id: 7,name: 'polyline',shape: 'polyline',type: 'shape',description:'创建仅包含直线的形状'},
        {id: 8,name: 'path',shape: 'path',type: 'shape',description:'用来定义路径'},
        {id: 9,name: '滤镜',shape: 'text',type: 'filter',description:'用来向形状和文本添加特殊的效果'},
        {id: 10,name: 'feBlend',shape: 'text',type: 'filter'},
        {id: 11,name: 'feColorMatrix',shape: 'text',type: 'filter'},
        {id: 12,name: 'feComponentTransfer',shape: 'text',type: 'filter'},
        {id: 13,name: 'feComposite',shape: 'text',type: 'filter'},
        {id: 14,name: 'feConvolveMatrix',shape: 'text',type: 'filter'},
        {id: 15,name: 'feDiffuseLighting',shape: 'text',type: 'filter'},
        {id: 16,name: 'feDisplacementMap',shape: 'text',type: 'filter'},
        {id: 17,name: 'feFlood',shape: 'text',type: 'filter'},
        {id: 18,name: 'feImage',shape: 'text',type: 'filter'},
        {id: 19,name: 'feMerge',shape: 'text',type: 'filter'},
        {id: 20,name: 'feMorphology',shape: 'text',type: 'filter'},
        {id: 21,name: 'feOffset',shape: 'text',type: 'filter'},
        {id: 22,name: 'feSpecularLighting',shape: 'text',type: 'filter'},
        {id: 23,name: 'feTile',shape: 'text',type: 'filter'},
        {id: 24,name: 'feTurbulence',shape: 'text',type: 'filter'},
        {id: 25,name: 'feDistantLight',shape: 'text',type: 'filter'},
        {id: 26,name: 'fePointLight',shape: 'text',type: 'filter'},
        {id: 27,name: 'feSpotLight',shape: 'text',type: 'filter'}
      ],
      edges: [
        {
          source: 0,
          target: 1
        },
        {
          source: 0,
          target: 9
        },
        {
          source: 1,
          target: 2
        },
        {
          source: 1,
          target: 3
        },
        {
          source: 1,
          target: 4
        },
        {
          source: 1,
          target: 5
        },
        {
          source: 1,
          target: 6
        },
        {
          source: 1,
          target: 7
        },
        {
          source: 1,
          target: 8
        },
        {
          source: 9,
          target: 10
        },
        {
          source: 9,
          target: 11
        },
        {
          source: 9,
          target: 12
        },
        {
          source: 9,
          target: 13
        },
        {
          source: 9,
          target: 14
        },
        {
          source: 9,
          target: 15
        },
        {
          source: 9,
          target: 16
        },
        {
          source: 9,
          target: 17
        },
        {
          source: 9,
          target: 18
        },
        {
          source: 9,
          target: 19
        },

        {
          source: 9,
          target: 20
        },
        {
          source: 9,
          target: 21
        },
        {
          source: 9,
          target: 22
        },
        {
          source: 9,
          target: 23
        },
        {
          source: 9,
          target: 24
        },
        {
          source: 9,
          target: 25
        },
        {
          source: 9,
          target: 26
        },
        {
          source: 9,
          target: 27
        }
      ]
    }
  },
  mounted(){
    this.draw();
  },
  methods: {
    draw(){
      const _this=this;
      const svg=this.d3.select('svg');
      const width=+svg.attr('width'),height=+svg.attr('height');
      const margin={
        top: 150,
        left: 150,
        right: 50,
        bottom: 0
      };
      const innerHeight=height-margin.top-margin.bottom;
      const innerWidth=width-margin.left-margin.right;
      let link,nodes,simulation;
      const render_init=function(){
        svg.append('text').attr('class','title')
        .attr('font-size','2em')
        .attr('x',margin.left)
        .attr('y',margin.top/2)
        .attr('transform',`translate(0,-40)`)
        .attr('font-weight','bold')
        .attr('fill','blue')
        .html('Force Simulation');

        svg.append('g')
        .attr('id','maingroup')
        .attr('x',margin.left)
        .attr('y',margin.top)
        .attr('transform',`translate(${margin.left},${margin.top})`)
        .attr('width',innerWidth)
        .attr('height',innerHeight)
      }
      const tick=function(){
        link.attr("x1",d=>d.source.x)
            .attr("y1",d=>d.source.y)
            .attr("x2",d=>d.target.x)
            .attr("y2",d=>d.target.y);
        nodes.attr('transform',d=>`translate(${d.x},${d.y})`)
      }
      const dragStarted=function(event,d){
        if(!event.active){
          // simulation.alpha(0.3).restart();
          simulation.alphaTarget(0.3).restart();
          d.fx=d.x;
          d.fy=d.y;
        }
      }
      const dragged=function(event,d){
        d.fx=event.x;
        d.fy=event.y;
      }
      const dragended=function(event,d){
        if(!event.active){
          simulation.alphaTarget(0);
        }
        d.fx=null;
        d.fy=null;
      }
      render_init();
      const group=this.d3.select('#maingroup');
      simulation = this.d3.forceSimulation()
        .nodes(this.nodes)
        .force("link",this.d3.forceLink(this.edges).id(d=>d.id).distance(200))
        .force('manyBody',this.d3.forceManyBody())
        .force("center",this.d3.forceCenter(innerWidth/2,innerHeight/2))
        .on('tick',tick);
      
       link = group.append('g').attr('class','linkgroup')
        .selectAll('line')
        .data(this.edges)
        .enter()
        .append('line')
        .attr('stroke-width',1)
        .attr('stroke','green')
        .attr('storke-opacity',0.6);
       nodes = group.append('g').attr('class','nodegroup')
        .selectAll('.nodes')
        .data(this.nodes)
        .join('g')
        .attr('class','node');
      nodes.append('circle')
        .attr('r',15)
        .attr('fill','red');
      nodes.append('text')
        .attr('x',6)
        .attr('y',3)
        .html(d=>d.name)
        .attr('font-size','12px');
      const dragFunc=_this.d3.drag()
      .on('start',dragStarted)
      .on('drag',dragged)
      .on('end',dragended);
      dragFunc(nodes);
    }
  }
}
</script>
<style scoped>

</style>
