//? fetching all data

const fetchingData = async () => {
    const fetching = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await fetching.json();
    const categories = data.data.news_category;
    displayCategories(categories);
    // console.log(categories)
}

const displayCategories = (categories) => {
    const parent = document.getElementById('parent-div');
    categories.forEach(catagory => {
        const div = document.createElement('div');
        div.classList = `tabs`;
        div.innerHTML = `
            <a onclick="showAllNewaAcategory('${catagory.category_id}')" class="tab tab-lg tab-lifted text-2xl mx-4">${catagory.category_name}</a>
        `
        parent.appendChild(div)
        // console.log(catagory.category_name)
    });
}

const showAllNewaAcategory = async (id) => {
    console.log(id)
    const fetchingId = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const showAllData = await fetchingId.json();
    
    showCategoryNwes(showAllData.data);
}

const showCategoryNwes = (categoryNewsArray) => {
    const newsDiv = document.getElementById('news-parent');
    newsDiv.innerHTML = '';
    categoryNewsArray.forEach(item => {
        const new_div = document.createElement('div');
        new_div.classList = ` bg-base-200 my-8 rounded-xl`;
        new_div.innerHTML = `
            <div class="hero-content flex-col lg:flex-row">
                <img src="${item.image_url}" class="max-w-lg rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-5xl font-bold">Box Office News!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>
        `;
        newsDiv.appendChild(new_div);
        // console.log(item.image_url)
    })
}


fetchingData();