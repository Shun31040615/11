import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';

const items = [{
  id:"item-8",
  content:"item-0"
},
{
  id:"item-1",
  content:"item-1"
},
{
  id:"item-2",
  content:"item-2"
},
{
  id:"item-3",
  content:"item-3"
}
]
const getListStyle = (isDraggingOver) =>({
  background : isDraggingOver ? "red" : "blue" ,
  width:250,
  border:"black 1px solid" ,
  padding:10
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 5 * 2,
  marginBottom: 10,

  background: isDragging ? "lightgreen" : "grey",



  ...draggableStyle,
});
const reorder = (list,startindex,endindex) =>{
  const removed = list.splice(startindex,1);
  console.log(removed[0]);
  list.splice(endindex,0,removed[0])
}

function App() {
  const onDragEnd =(result) =>{
    console.log(result);
    if(!result.destination){
      return
    };
    reorder(items,result.source.index,result.destination.index);
  };
  return (
    <div>
      <DragDropContext onDragEnd = {onDragEnd}>
        <Droppable droppableId = "droppable">
          {(provided, snapshot)=> (
            <div style = {getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item,index)=>(
                <Draggable key = {item.id} draggableId = {item.id} index = {index}              
                  >
                {(provided,snapshot)=>
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                }
              </Draggable>

              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
