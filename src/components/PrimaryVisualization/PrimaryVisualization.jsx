// src/components/PrimaryVisualization/PrimaryVisualization.jsx
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './PrimaryVisualization.css';

function PrimaryVisualization({ events }) {
  const svgRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!events || events.length === 0) return;

    // Find the latest array state up to the current step
    let arrayState = [];
    for (let i = 0; i <= currentStep && i < events.length; i++) {
      if (events[i].type === 'array_state') {
        arrayState = events[i].data;
      }
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 100;
    const boxSize = 50;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('width', width).attr('height', height);

    // Draw array boxes
    const boxes = svg
      .selectAll('g')
      .data(arrayState)
      .join('g')
      .attr('transform', (d, i) => `translate(${margin.left + i * (boxSize + 5)}, ${margin.top})`);

    // Box rectangles
    boxes
      .append('rect')
      .attr('width', boxSize)
      .attr('height', boxSize)
      .attr('fill', '#00D4FF') // Cyan
      .attr('stroke', '#1A1A3D')
      .attr('stroke-width', 2)
      .transition()
      .duration(500)
      .attr('x', 0);

    // Value labels
    boxes
      .append('text')
      .attr('x', boxSize / 2)
      .attr('y', boxSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#1A1A3D')
      .attr('font-size', '16px')
      .attr('font-weight', '600')
      .text((d) => d);

    // Index labels
    boxes
      .append('text')
      .attr('x', boxSize / 2)
      .attr('y', boxSize + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6B48FF') // Purple
      .attr('font-size', '12px')
      .text((d, i) => i);
  }, [events, currentStep]);

  // Auto-play steps
  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % events.length);
    }, 1000); // 1s per step
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="primary-visualization">
      <h3>Array Visualization</h3>
      <svg ref={svgRef}></svg>
      <div className="controls">
        <button onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}>
          Previous
        </button>
        <button onClick={() => setCurrentStep((prev) => (prev + 1) % events.length)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PrimaryVisualization;