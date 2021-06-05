$("#uploadVid").on("change", async (e) => {
    let date = new Date()
    form = new FormData();
    form.append("data", e.target.files[0]);
    form.append("date", date);
    
    await videoApi.create(form);
});