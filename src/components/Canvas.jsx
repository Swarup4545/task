import React, { useRef, useState } from 'react'
import CanvasPaint from 'react-canvas-paint'
const generateRandomColor=()=>{
    const letters='0123456789ABCDEF';
    let color="#";
    for (let i=0;i<6;i++)
    {
        color+=letters[Math.floor(Math.random()*16)];
    }
    return color;
}

const isOverlapping=(circle1,circle2)=>{
    const dx=circle1.x -circle2.x;
    const dy=circle1.y - circle2.y;
    const distance=Math.sqrt(dx * dx +dy +dy);
    return distance < circle1.radius + circle2.radius;
};
const Canvas = () => {
   

    const [circles,setCircles]=useState([]);
   
  
    const handleCanvasClick=(e)=>{
        const canvas=e.target;
        const rect= canvas.getBoundingClientRect();
        const x=e.clientX - rect.left;
        const y=e.clientY - rect.top;
        const radius= Math.floor(Math.random()* 40)+10;
        const newCircle={x,y,radius,color:generateRandomColor()};
        const updatedCrcles=circles.map((circle)=>{
            if(isOverlapping(circle,newCircle)){
                circle.color='red';
            }
            return circle;
        })
        setCircles([...updatedCrcles,newCircle]);
        
    }

  return (
    <>
    <div className='h-screen w-full bg-gray-100 flex items-center justify-center'>
        <CanvasPaint width={800} height={600} onClick={handleCanvasClick} className="border-2 border-gray-500">
            {circles.map((circle,index)=>(
                <circle key={index} cx={circle.x} cy={circle.radius} fill={circle.color}/>
            ))}
        </CanvasPaint>
    </div>
    </>
  )
}

export default Canvas


