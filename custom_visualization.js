function createMindmapVisualization(element, config, data) {
    const width = element.clientWidth;
    const height = element.clientHeight;
  
    const svg = d3.select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)");
  
    const tree = d3.tree().size([height, width - 160]);
  
    const root = d3.hierarchy(data);
    const nodes = tree(root);
  
    const link = svg.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d => {
        return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });
  
    const node = svg.selectAll(".node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
  
    node.append("circle")
      .attr("r", d => d.data.size ? d.data.size / 10 : 10);
  
    node.append("text")
      .attr("dy", ".35em")
      .attr("x", d => d.children ? -13 : 13)
      .style("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name);
  }
  