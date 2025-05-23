import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './PrimaryVisualization.css';

function PrimaryVisualization({ events }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!events || events.length === 0) return;

    let arrayState = [];
    let highlightIndex = null;
    let highlightColor = '#00897B'; // Darker Teal for most highlights

    // Process all events to determine the final state
    events.forEach(event => {
      if (event.type === 'array_state') {
        arrayState = event.data || [];
        highlightIndex = event.highlight || null;
      } else if (event.type === 'highlight') {
        arrayState = event.data || arrayState;
        highlightIndex = event.index;
        if (event.action === 'search') {
          if (highlightIndex !== null) {
            highlightColor = '#FFD54F'; // Yellow for search (found)
          } else {
            highlightColor = '#FF5555'; // Red if not found (won't be used since no highlight)
          }
        }
      } else if (event.type === 'no_op') {
        // No operation, keep current state
      }
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = 600;
    const height = 120;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const arrayLength = arrayState.length;
    const boxSize = Math.min(50, (containerWidth - margin.left - margin.right) / Math.max(arrayLength, 1) - 5);

    const totalWidth = arrayLength * (boxSize + 5) + margin.left + margin.right;
    svg.attr('width', Math.max(containerWidth, totalWidth)).attr('height', height);

    const boxes = svg
      .selectAll('g')
      .data(arrayState)
      .join('g')
      .attr('transform', (d, i) => `translate(${margin.left + i * (boxSize + 5)}, ${margin.top})`);

    boxes
      .append('rect')
      .attr('width', boxSize)
      .attr('height', boxSize)
      .attr('fill', (d, i) => (i === highlightIndex ? highlightColor : d === null ? '#D3D3D3' : '#26A69A')) // Teal for boxes, Light Gray for null
      .attr('stroke', '#2D2D2D') // Charcoal stroke
      .attr('stroke-width', 2)
      .transition()
      .duration(500);

    boxes
      .append('text')
      .attr('x', boxSize / 2)
      .attr('y', boxSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#2D2D2D') // Charcoal text
      .attr('font-size', '16px')
      .attr('font-weight', '600')
      .text((d) => (d !== null ? d : ''));

    boxes
      .append('text')
      .attr('x', boxSize / 2)
      .attr('y', boxSize + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#666666') // Medium Gray indices
      .attr('font-size', '12px')
      .text((d, i) => i);
  }, [events]);

  return (
    <div className="card shadow-sm p-3 visualization-card">
      <h3 className="card-title text-primary mb-3">Array Visualization</h3>
      <div className="visualization-wrapper">
        <svg ref={svgRef} className="border border-secondary" style={{ minHeight: '120px' }}></svg>
      </div>
    </div>
  );
}

export default PrimaryVisualization;