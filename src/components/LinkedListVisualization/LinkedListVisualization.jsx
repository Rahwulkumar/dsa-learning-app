// src/components/LinkedListVisualization/LinkedListVisualization.jsx
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './LinkedListVisualization.css';

function LinkedListVisualization({ events }) {
  const svgRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!events || events.length === 0) return;

    const event = events[currentStep % events.length];
    let listState = event.type === 'list_state' ? event.data : [];
    let highlightIndex = null;
    let highlightColor = '#FFD166'; // Default yellow for search/update

    if (event.type === 'highlight') {
      listState = events.find(e => e.type === 'list_state')?.data || [];
      highlightIndex = event.index;
      if (event.action === 'search' && highlightIndex === null) {
        highlightColor = '#FF5555'; // Red if not found
      }
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 120;
    const nodeSize = 50;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('width', width).attr('height', height);

    const nodes = svg
      .selectAll('g')
      .data(listState)
      .join('g')
      .attr('transform', (d, i) => `translate(${margin.left + i * (nodeSize + 30)}, ${margin.top})`);

    nodes
      .append('circle')
      .attr('r', nodeSize / 2)
      .attr('fill', (d, i) => (i === highlightIndex ? highlightColor : '#00D4FF'))
      .attr('stroke', '#1A1A3D')
      .attr('stroke-width', 2)
      .transition()
      .duration(500);

    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#1A1A3D')
      .attr('font-size', '16px')
      .attr('font-weight', '600')
      .text((d) => d);

    nodes
      .filter((d, i) => i < listState.length - 1)
      .append('line')
      .attr('x1', nodeSize / 2 + 10)
      .attr('y1', 0)
      .attr('x2', nodeSize + 20)
      .attr('y2', 0)
      .attr('stroke', '#6B48FF')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#6B48FF');
  }, [events, currentStep]);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % events.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="card shadow-sm p-3">
      <h3 className="card-title text-primary mb-3">Linked List Visualization</h3>
      <svg ref={svgRef} className="border border-secondary" style={{ minHeight: '120px' }}></svg>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={() => setCurrentStep((prev) => (prev + 1) % events.length)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default LinkedListVisualization;