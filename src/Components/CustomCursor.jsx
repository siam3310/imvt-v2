import { MousePointer2, MousePointerClick } from "lucide-react"
import React, { useState, useRef } from "react";
// import './CustomCursor.css'
function App({ children }) {
    const cursor = useRef(null)
    const [isclickable, setIsclickable] = useState(false)
    const changePosition = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Get the element that the mouse is over
        const element = document.elementFromPoint(clientX, clientY);
        // Change the cursor icon based on the element that the mouse is over
        if (element && (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.classList.contains('clickable') || (element.parentElement && element.parentElement.classList.contains('clickable')))) {
            setIsclickable(true)
        } else {
            setIsclickable(false)
        }
        // Hide the cursor when it's at the edge of the browser
        if (clientX <= 0 || clientY <= 0 || clientX >= innerWidth || clientY >= innerHeight) {
            cursor.current.style.display = 'none';
        } else {
            cursor.current.style.display = 'block';
            cursor.current.style.top = `${clientY + 12}px`; // Subtract half the height of the icon
            cursor.current.style.left = `${clientX + 12}px`;
        }
    }
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ['white', 'cyan', 'red', 'lime', 'yellow', 'orange', 'black', 'gray'];

    const changeColor = (e) => {
        e.preventDefault();
        setColorIndex((colorIndex + 1) % colors.length);
    }
    return (
        <div
            className="App"
            style={{ minHeight: "100vh", "minWidth": "100vw" }}
            onMouseMove={changePosition}
            onContextMenu={changeColor}
        >
            {children}
            <div className="cursor-style" ref={cursor} >{isclickable ? <MousePointerClick fill={colors[colorIndex]} color={colors[colorIndex]} /> : <MousePointer2 fill={colors[colorIndex]} color={colors[colorIndex]} />}</div>        </div>
    )
}

export default App