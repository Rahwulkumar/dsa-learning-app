// src/components/SearchingVisualization/SearchingVisualization.jsx
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './SearchingVisualization.css';

function SearchingVisualization({ events }) {
  const svgRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!events || events.length === 0) return;

    const event = events[currentStep % events.length];
    const arrayState = event.data;
    const currentIndex = event.currentIndex;
    const found = event.found;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 120;
    const boxSize = 50;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('width', width).attr('height', height);

    const boxes = svg
      .selectAll('g')
      .data(arrayState)
      .join('g')
      .attr('transform', (d, i) => `translate(${margin.left + i * (boxSize + 5)}, ${margin.top})`);

    boxes
      .append('rect')
      .attr('width', boxSize)
      .attr('height', boxSize)
      .attr('fill', (d, i) =>
        i === currentIndex ? (found ? '#FFD166' : '#FF5555') : '#00D4FF'
      )
      .attr('stroke', '#1A1A3D')
      .attr('stroke-width', 2)
      .transition()
      .duration(500);

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

    boxes
      .append('text')
      .attr('x', boxSize / 2)
      .attr('y', boxSize + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6B48FF')
      .attr('font-size', '12px')
      .text((d, i) => i);
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
      <h3 className="card-title text-primary mb-3">Searching Visualization</h3>
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

export default SearchingVisualization;