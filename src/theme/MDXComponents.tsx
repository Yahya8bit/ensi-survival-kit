import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import PdfViewer from '@site/src/components/PdfViewer';
import DijkstraVisualizer from '@site/src/components/DijkstraVisualizer';
import KruskalVisualizer from '@site/src/components/KruskalVisualizer';
import DiskCalculator from '@site/src/components/DiskCalculator';
import AutomatonSimulator from '@site/src/components/AutomatonSimulator';

export default {
  ...MDXComponents,
  PdfViewer,
  DijkstraVisualizer,
  KruskalVisualizer,
  DiskCalculator,
  AutomatonSimulator,
};
