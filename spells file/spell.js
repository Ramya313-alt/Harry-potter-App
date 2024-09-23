const spellContainer=document.querySelector('.spell-container');
const searchBar = document.getElementById('searchBar');

let spellList=[];

window.onload=async()=>{
    try {
        const getSpell=await fetch('https://potterapi-fedeperin.vercel.app/en/spells',{
            method:'GET'

        });
     spellList = await getSpell.json(); //store fetch one into spellList
        displaySpells(spellList)//display all spellssss
        
        
    } catch (error) {
        console.log(error)
    }
}
//display spells on the page

const displaySpells=(spells)=>{
    spellContainer.innerHTML = '';
    spells.forEach((spellOne)=>{
        const {spell,use,index}=spellOne;
        
        const html=`
        <div class=" border p-2 m-3 text-center rounded p-2" >
            <h1 >Spell : ${spell}</h1>
            <h3 class='text-secondary'><strong class='text-dark'>Use:</strong> ${use}</h3>
            <h3 class='text-secondary'> <strong class='text-dark'>Index :</strong> ${index}</h2>
        </div>  
        `
        spellContainer.innerHTML += html
    })
}

searchBar.addEventListener('input', ()=>{
    const searchTerm = searchBar.value.toLowerCase();
    //^^^ search term is converted to lowercase 
    const filterSpells = spellList.filter(spellOne=>spellOne.spell.toLowerCase().includes(searchTerm))
    displaySpells(filterSpells)
})