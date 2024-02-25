import React, { useState } from 'react';
import { render } from '@boardzilla/core';
import { HexSpace, SliceColumn, default as setup } from '../game/index.js';

import './style.scss';
import '@boardzilla/core/index.css';
import { NUM_SLICE_COLUMNS } from '../game/board-coordinates.js';


render(setup, {
  settings: {
  },

  layout: board => {
    board.appearance({
      render: () => null
    });

    board.layout(SliceColumn, {
      alignment: 'top',
    });

    board.layout(HexSpace, {
      offsetRow: {x: -50, y: 75},
      offsetColumn: 100,
      alignment: 'top',
      showBoundingBox: true,
      scaling: 'fill',
    });

    const size = 100;
    const half_size = size / 2;
    const y_offset = half_size * Math.sin(Math.PI / 6);

    const top_x = size / 2;
    const top_y = 0;
    const clockwise1_x = size;
    const clockwise1_y = half_size - y_offset;
    const clockwise2_x = size;
    const clockwise2_y = half_size + y_offset;
    const bottom_x = size / 2;
    const bottom_y = size;
    const clockwise4_x = 0;
    const clockwise4_y = half_size + y_offset;
    const clockwise5_x = 0;
    const clockwise5_y = half_size - y_offset;

    board.all(HexSpace).appearance({
      aspectRatio: 1,
      render: (hexSpace) => {

        const boardCoordinateLabel = `[${hexSpace.row!}, ${hexSpace.column!}]`;
        const hexOutlineStrokeWidth = "2px";
        const hexOutlineVerticalStrokeWidth = "4px";
    
        return (
          <div style={{
            height: "100%",
            borderColor: "black", 
            }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              >
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={32}>
                {boardCoordinateLabel}
              </text>
              <line x1={top_x} y1={top_y} x2={clockwise1_x} y2={clockwise1_y} stroke="black" strokeWidth={hexOutlineStrokeWidth} />
              <line x1={clockwise1_x} y1={clockwise1_y} x2={clockwise2_x} y2={clockwise2_y} stroke="black" strokeWidth={hexOutlineVerticalStrokeWidth} />
              <line x1={clockwise2_x} y1={clockwise2_y} x2={bottom_x} y2={bottom_y} stroke="black" strokeWidth={hexOutlineStrokeWidth} />

              <line x1={bottom_x} y1={bottom_y} x2={clockwise4_x} y2={clockwise4_y} stroke="black" strokeWidth={hexOutlineStrokeWidth} />
              <line x1={clockwise4_x} y1={clockwise4_y} x2={clockwise5_x} y2={clockwise5_y} stroke="black" strokeWidth={hexOutlineVerticalStrokeWidth} />
              <line x1={clockwise5_x} y1={clockwise5_y} x2={top_x} y2={top_y} stroke="black" strokeWidth={hexOutlineStrokeWidth} />

            </svg>
          </div>
        )
      }
    })

    board.all(SliceColumn).appearance({
      aspectRatio: 1 / NUM_SLICE_COLUMNS,
      render: (sliceColumn) => {
        const [isMouseInside, setIsMouseInside] = useState(false);

        const handleMouseEnter = () => {
          setIsMouseInside(true);
        };

        const handleMouseLeave = () => {
          setIsMouseInside(false);
        };

        const borderStyle = isMouseInside ? 'solid' : 'dashed';
        const borderColor = isMouseInside ? 'red' : 'black';
        const borderWidth = isMouseInside ? '2px' : '0px';
  
        return (
          <div style={{
              height: "100%",
              borderLeft: borderStyle + " " + borderColor + " " + borderWidth,
              borderRight: borderStyle + " " + borderColor + " " + borderWidth,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
              {isMouseInside ? `${sliceColumn.row}:${sliceColumn.column}` : ""}
          </div>
        )
      }
    })
  }
});
