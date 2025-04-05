
import { useEffect, useRef } from 'react';

interface MoleculeCanvasProps {
  className?: string;
}

export function MoleculeCanvas({ className }: MoleculeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match display size
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    
    // Node setup
    const numNodes = 15;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 5 + 3,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5,
      color: getRandomColor(),
    }));
    
    // Connection setup
    const connections: Array<{ from: number; to: number }> = [];
    for (let i = 0; i < numNodes - 1; i++) {
      const numConnections = Math.floor(Math.random() * 3) + 1; // 1-3 connections per node
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * numNodes);
        if (target !== i) {
          connections.push({ from: i, to: target });
        }
      }
    }
    
    function getRandomColor() {
      const colors = [
        'rgba(139, 92, 246, 0.7)', // Purple
        'rgba(6, 182, 212, 0.7)',  // Cyan
        'rgba(16, 185, 129, 0.7)', // Green
        'rgba(236, 72, 153, 0.7)', // Pink
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        // Calculate distance for opacity
        const dx = fromNode.x - toNode.x;
        const dy = fromNode.y - toNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.min(width, height) / 2;
        const opacity = Math.max(0, 1 - distance / maxDistance);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x <= node.radius || node.x >= width - node.radius) {
          node.vx *= -1;
        }
        if (node.y <= node.radius || node.y >= height - node.radius) {
          node.vy *= -1;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      // Continue animation
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    return () => {
      // Any cleanup if needed
    };
  }, []);
  
  return <canvas ref={canvasRef} className={className} />;
}
