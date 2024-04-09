import { getBoard ,getTeam,setCell, setPlayerTeam} from "./api.js";

const refreshGrid = async() =>{
    let board = await getBoard().then(res => res);
    let grid = document.querySelector(".view");
    grid.innerHTML = '';
    board.map((elem,rowIndex)=>{
        let row = document.createElement("div");
        row.classList.add("row")
        grid.appendChild(row);
        elem.map((cell,colIndex)=>{
            let c = document.createElement("div");
            c.classList.add("cell");
            row.appendChild(c);
            c.style.backgroundColor = cell;
            c.onclick = async ()=>{
                let color = document.querySelector("#color").value;
                console.log(color);
                console.log(colIndex);
                console.log(rowIndex);
                setCell("8c9f2a5b",color,colIndex,rowIndex).then(res=>console.log(res))
                setTimeout(()=>refreshGrid(),1000);
            }
        })
    })
}

const teamButtons = async()=>{
    
}

refreshGrid();
