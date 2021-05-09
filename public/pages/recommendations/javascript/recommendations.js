
$(document).ready(() => {
    addRecommendationElements();

    $("#recommendationForm").on("submit", async (event) => {
        event.preventDefault()
        const author = $("#author").val();
        const relation = $("#relation").val();
        const headline = $("#headline").val();
        const recommendationText = $("#recommendationText").val();

        let response = await fetch("/recommendations/create", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({author, relation, headline, recommendationText})   
        })

        addRecommendationElements();
        
    });

})

async function addRecommendationElements(){
    let response = await fetchRecommendations();
    let recs = $("#recommendations");
    console.log(response)
    if(response.recommendations.length){
        recs.empty();
        recs.append((response.recommendations.map(createRecommendationElement)))
    }
}

async function fetchRecommendations(){
    let response = await fetch("/recommendations/get");
    response = await response.json();
    return response
}

function createRecommendationElement(rec){
    return $("<div>").addClass("m-10 flex flex-shrink flex-col text-center shadow-xl")
        .append(
            $("<h1>")
            .addClass("bg-red-800 bg-opacity-75 rounded-t-md")
            .text(rec.headline)
        ).append(
            $("<div>")
            .addClass("p-2 flex flex-row items-center bg-black bg-opacity-30")
            .append(
                $("<p>")
                .addClass("text-sm text-left p-5")
                .text(rec.recommendationText)
            )
        ).append(
            $("<h1>")
            .addClass("bg-red-800 bg-opacity-75 rounded-b-md")
            .text(rec.author +" : "+ rec.relation)
        )
}
