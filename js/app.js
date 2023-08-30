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

const showCategoryNwes = (categoryNewsArray, isClicked) => {
    const newsDiv = document.getElementById('news-parent');
    newsDiv.innerHTML = '';
    categoryNewsArray.forEach(item=> {
        console.log("clicked", isClicked);
        if (item.details.length > 300) {
            item.details = item.details.slice(0, 300);
        }
        const new_div = document.createElement('div');
        new_div.classList = ` bg-base-200 my-8 rounded-xl`;
        new_div.innerHTML = `
            <div class="flex gap-4 p-4 flex-col lg:flex-row">
                <img src="${item.image_url}" class="max-w-lg rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-2xl font-bold">${item.title}</h1>
                    <p class="py-4">${item.details}..</p>

                    <div class="flex justify-between items-center mt-16">
                        <div class="flex justify-center items-center gap-2">
                            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full flex justify-center items-center">
                                    <img src="${item.author.img}" />
                                </div>
                            </label>
                            <div>
                                <h1 class="text-base font-medium">${item.author.name}</h1>
                                <p class="text-base font-medium">${item.author.published_date.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div>
                            <h1><i class="fa-solid fa-eye"></i> ${item.total_view}</h1>
                        </div>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <div>
                            <button onclick="readFullNews('${item._id}')" class="btn btn-outline btn-secondary">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsDiv.appendChild(new_div);
        // console.log(item._id)
    })
}

// const readFullNews = async (id) => {
//     await fetch(``)
//     my_modal.showModal();
// }

fetchingData();