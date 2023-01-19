const btn = document.querySelector('.changecolorbtn');
const colorgrid = document.querySelector('.colorgrid');
const colorvalue = document.querySelector('.colorvalue');


btn.addEventListener('click', async() => {
    chrome.storage.sync.get('color',({ color }) =>{
        console.log('color:', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
   
    chrome.scripting.executeScript({
        
        target: { tabId: tab.id },

        function: pickColor,
    }, async(injectionResults) => {
         const [data]= injectionResults;

        if (data.result) {
            const color = data.result.sRGBHex;
            colorgrid.style.backgroundColor = color;
            colorvalue.innerText = color;
            try{

            
            await navigator.clipboard.writeText(color);
            } catch(err){
                console.error(err);
            }

        
        } 
       

  
    }
    );
});


 async function pickColor(){
    try{

        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        console.log(selectedColor)

    } catch (err){
        console.error(err);

    }
}
