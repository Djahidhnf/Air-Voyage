$(".btn.item").on('click', function () {
    $(this).toggleClass("active");
});

//when user searches for flight or stays show the spinner
$(".search-bar-stays").children("button").on("click", function () {
    if (document.querySelector(".error-stays").classList[1] !== "hidden") {
        $(".error-stays").addClass("hidden");
    }
    $(".still-searching-stays").removeClass("hidden");
    setTimeout(() => {
        $(".still-searching-stays").addClass("hidden");
        $(".error-stays").removeClass("hidden");
    }, 8000);
});

$(".search-bar-flights").children("button").on("click", function () {
    if (document.querySelector(".error-flights").classList[1] !== "hidden") {
        $(".error-flights").addClass("hidden");
    }
    $(".still-searching-flight").removeClass("hidden");
    setTimeout(() => {
        $(".still-searching-flight").addClass("hidden");
        $(".error-flights").removeClass("hidden");
    }, 8000);
})


