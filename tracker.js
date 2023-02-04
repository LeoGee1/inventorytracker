const tabs = document.querySelector('#tabs-parent');
const sections = document.querySelectorAll('.section');
const heads = document.querySelectorAll('.heads');
const tabbed = document.querySelectorAll('.tab');
const list = document.querySelector('#homePage');
const detailsList = document.querySelector('#detailsPage');


// this is to swicth tabs uopn clicking action for the section
tabs.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const targetSection = document.querySelector(e.target.dataset.target);
        sections.forEach((section) => {
            if (section === targetSection) {
                section.classList.add('active');
            }else {
                section.classList.remove('active');
            }
        });
    } else if(e.target.tagName === 'I') {
        const targetSection = document.querySelector(e.target.dataset.target);
        sections.forEach((section) => {
            if (section === targetSection) {
                section.classList.add('active');
            }else {
                section.classList.remove('active');
            };
        });
    };
}); 


// this is also to switch tabs upon clicking action for the heads
tabs.addEventListener ('click', (e) => {
    if (e.target.tagName === 'LI') {
        const targetHead = document.querySelector(e.target.dataset.head);
        heads.forEach((head) => {
            if (head === targetHead) {
                head.classList.add('active');
            } else {
                head.classList.remove('active');
            };
        });
    }else if (e.target.tagName === 'I') {
        const targetHead = document.querySelector(e.target.dataset.head);
        heads.forEach((head) => {
            if (head === targetHead) {
                head.classList.add('active')
            }
            else {
                head.classList.remove('active')
            };
        });
    };

});

//this is to make you see general info on products no mater what product you click
list.addEventListener('click', (e) => {
    if(e.target.className === 'fa-solid fa-circle-info') {
        const targetSection = document.querySelector(e.target.dataset.target);
        sections.forEach((section) => {
            if (section === targetSection) {
                section.classList.add('active');
            }
            else {
                section.classList.remove('active');
            };
        });
    };
})

//this is to make the tab bottom border be visible on click
tabbed.forEach(tab => {
    tab.addEventListener('click', () =>{
        document.querySelector('.one').classList.remove('one');
        tab.classList.add('one');
    });
});

// this is to display product preview image for upload
const preview = document.querySelector('#file');
const displayImage = document.querySelector('#labelFile');
let uploaded_image = '';


preview.addEventListener('change', function() {
   if(preview.files.length > 0) {
        const fileSize = preview.files.item(0).size;
        const fileKb =  Math.round(fileSize / 1024);
        if(fileKb >= 500) {
            alert('file too big, please select a file less than 500kb')
        }else {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                uploaded_image = reader.result;
                displayImage.style.backgroundImage = `url(${uploaded_image})`;
                
            });
            reader.readAsDataURL(this.files[0]);
        };
   };
});


let basket = [
    {
        id: 'zero',
        name: 'Sample One',
        desc: 'This is a very high quality lotion that is mainly focused on softening and brightening the human skin, making sure there is no alteration in natural composure',
        image: 'images/beautyproduct.png',
        item: 0,
    },
    {
        id: 'one',
        name: 'Sample-pro-2',
        desc: 'high qaulity you can trust at all times',
        image: 'images/colour.jpg',
        item: 0,
    },
    {
        id: 'two',
        name: 'Sample-pro-3',
        desc: 'high qaulity you can use at all times',
        image: 'images/air.jpg',
        item: 0,
    },
    {
        id: 'three',
        name: 'Sample-pro-4',
        desc: 'high qaulity you can call on at all times',
        image: 'images/apple.jpg',
        item: 0,
    }
];

basket = JSON.parse(localStorage.getItem('data')) || basket;


let samplesData = [ 
    {
        id: 'sample-zero',
        name: 'Sample One',
        desc: 'This is a very high quality lotion that is mainly focused on softening and brightening the human skin, making sure there is no alteration in natural composure',
        image: 'images/beautyproduct.png',
    },
    {
        id: 'sample-one',
        name: 'Sample-pro-2',
        desc: 'high qaulity you can trust at all times',
        image: 'images/colour.jpg',
    },
    {
        id: 'sample-two',
        name: 'Sample-pro-3',
        desc: 'high qaulity you can use at all times',
        image: 'images/air.jpg',
    },
    {
        id: 'sample-three',
        name: 'Sample-pro-4',
        desc: 'high qaulity you can call on at all times',
        image: 'images/apple.jpg',
    }
];

samplesData = JSON.parse(localStorage.getItem('samples')) || samplesData;

localStorage.setItem('data', JSON.stringify(basket));
localStorage.setItem('samples', JSON.stringify(samplesData));


//this is to display our sample produts using only js
const samplesDisplay = () => {

    return (list.innerHTML =  samplesData.map((sample) => {

        let { id, name, image } = sample;        
        return  `

        <div id = ${id} class="items" style = "background-image : url(${image})">
         <div class="slash-parent"><i class="fa-solid fa-store-slash"></i>
         </div>
         <h2 class="stock">Out of Stock</h2>
         <div class="items-menu">
          <h3 class="items-name">${name}</h3>
          <i class="fa-solid fa-circle-info" data-target=".details-page"></i>
          <i class="fa-solid fa-xmark"></i>
         </div>
      </div>
        `
    }).join(''));
};

samplesDisplay();

// this is to display sample details directly from javascript

const sampleDetailsDisplay = () => {
    return(detailsList.innerHTML = basket.map((sample) => {
        let { id, item, name, image, desc } = sample;
        // console.log(basket);
        let search = basket.find((sample) => sample.id === id);
        // console.log(id);      
        return  `
        <div id = sample-details-${id} class="big-box">
          <div class="left" >
             <div class="imagery" style = "background-image : url(${image})"></div>
          <h3 class="name">${name}</h3>
        </div>

        <div class="right">
          <div class="right-above">
            <i class="fa-regular fa-square-check"></i>
            <i class="fa-solid fa-xmark ex"></i>
            <i class="fa-solid fa-ellipsis"></i>
            <i onclick = "decrement(${id})" class="fa-solid fa-minus fas"></i>
            <i onclick = "increment(${id})" class="fa-solid fa-plus fap"></i>
          </div>

          <h3 class="description">${desc}</h3>

          <div class="right-below">
            <div class="quantity">Quantity</div>
            <div id = ${id} class="counter">${search.item === undefined? 0: search.item}</div>
          </div>
        </div>
      </div>
        `
    }).join(''));
};

sampleDetailsDisplay();

const prevent =  (e) => {
    e.preventDefault()
};
// this is to add product image, product name to the home page
const addBtn = document.querySelector('#addBtn');

const plusItemsToPage = (x) => {
    let { id, name, desc, image } = x;
    let nameValue = document.querySelector('#productName').value.trim();
    let descriptionValue = document.querySelector('#productDescription').value.trim();
    let itemId =`sample-${nameValue}`.replaceAll(' ', '');
    let img = `${uploaded_image}`;

    if(nameValue.length === 0 || nameValue.length > 15 || descriptionValue.length === 0 || descriptionValue.length > 200 || displayImage.style.backgroundImage === ''){
        return;
     }
     let search = samplesData.find((x) => x.id === itemId)
     if (search === undefined) {

            samplesData.push({
                id: itemId,
                name: nameValue,
                desc: descriptionValue,
                image: img,
            });

            localStorage.setItem('samples', JSON.stringify(samplesData));
          // create elements
          const items = document.createElement('div');
          const upper = document.createElement('div');
          const slashItem = document.createElement('i');
          const stockOut = document.createElement('h2');
          const itemsMenu = document.createElement('div');
          const itemsName = document.createElement('h3');
          const info = document.createElement('i');
          const cancel = document.createElement('i');
  
          //add text contents
          itemsName.textContent = nameValue.toLowerCase();
          stockOut.textContent = 'Out of Stock';
  
          // create classes
          items.classList.add('items');
          slashItem.classList.add('fa-solid', 'fa-store-slash');
          stockOut.classList.add('stock');
          itemsMenu.classList.add('items-menu');
          itemsName.classList.add('items-name');
          upper.classList.add('slash-parent');
          info.classList.add('fa-solid', 'fa-circle-info');
          cancel.classList.add('fa-solid', 'fa-xmark');
          info.setAttribute('data-target','.details-page');
          items.setAttribute('id', itemId);
          //append elements to elements
          upper.appendChild(slashItem);
          itemsMenu.append(itemsName, info, cancel);
          items.append(upper, stockOut, itemsMenu);
          list.appendChild(items);

           
        items.style.backgroundImage =  `url(${uploaded_image})`;
        upper.addEventListener('mouseover', () => {
            upper.firstElementChild.style.visibility = 'visible';
        });
        upper.addEventListener('mouseout', () => {
            upper.firstElementChild.style.visibility = 'hidden';
        });
     } else {
        return;
     }
    
};

let data = 0;
const plusItemsToPageDetails = (prop) => {
    let { id, name, desc, image, item} = prop;
    let nameValue = document.querySelector('#productName').value.trim();
    let counterId = nameValue.replaceAll(' ', '');
    let descriptionValue = document.querySelector('#productDescription').value.trim();
    let img = `${uploaded_image}`;
    newItems = {
        id : counterId,
        item: 0,
        name : nameValue,
        desc : descriptionValue,
        image: img,
    };
    
    data++;

     if(nameValue.length === 0 || nameValue.length > 15 || descriptionValue.length === 0 || descriptionValue.length > 200 || displayImage.style.backgroundImage === ''){
        return;
     } 
     let search = basket.find((x) => x.id == counterId);
     console.log(search);

     if (search === undefined) {
        basket.push(newItems);
        localStorage.setItem('data', JSON.stringify(basket));

        return detailsList.innerHTML += ( 
            `
            <div class="big-box">
            <div class="left">
                <div class="imagery" style = "background-image : url(${img})"></div>
                <h3 class="name">${nameValue}</h3>
            </div>
    
            <div class="right">
                <div class="right-above">
                <i class="fa-regular fa-square-check"></i>
                <i class="fa-solid fa-xmark ex"></i>
                <i class="fa-solid fa-ellipsis"></i>
                <i onclick = "decrement(${counterId})" class="fa-solid fa-minus fas"></i>
                <i onclick = "increment(${counterId})" class="fa-solid fa-plus fap"></i>
                </div>
    
                <h3 class="description">${descriptionValue}</h3>
    
                <div class="right-below">
                <div class="quantity">Quantity</div>
                <div id= ${counterId} class="counter">${search === undefined? 0: search.item}
                </div>
                </div>
            </div>
            </div>
             ` 
         );
    } 
        else {
            return;
        };
};
    

addBtn.addEventListener('click', plusItemsToPage);
addBtn.addEventListener('click', plusItemsToPageDetails);
addBtn.addEventListener('click', prevent);





