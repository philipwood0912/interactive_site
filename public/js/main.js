const myVM = (() => {
        //variables
        var infoCon = document.querySelectorAll('.info-con'),
            america = document.getElementById("america"),
            left = document.querySelector('.left'),
            right = document.querySelector('.right'),
            locTitle = document.querySelectorAll('.loc-title'),
            svgCon = document.querySelector("#svg-con"),
            svgInfo = document.querySelector("#svg-info"),
            cards = document.querySelectorAll(".card"),
            linkUp = document.querySelectorAll(".u-link");
        var titleArr = [];
        var counter = 0;
        var chartref;
    
        //function for counter control
        function counterCheck(x) {
            counter += x;
            if(counter > 29){
                counter = 0;
            }
            if(counter < 0){
                counter = 29;
            }
        }
    
        function conControl(x) {
            infoCon.forEach(con => {
                con.classList.add("hidden");
            });
            infoCon[x].classList.remove("hidden");
        }
        // function for stroke %x
        function renderPercent(data){
            let percent = (data / 30) * 100;
            return Math.round(percent);
        }
        // function for each %'s stroke length
        function renderStrokeLength(data){
            let percent = (data / 30) * 100;
            let radius = 290 / 2;
            let circum = (2 * Math.PI) * radius;
            let strokeLength = (circum / 100) * percent;
            return strokeLength;
        }
    
        //parse user data
        function parseChartData(data){
            let strokeNum = renderStrokeLength(data.Number);
            let percentNum = renderPercent(data.Number);
            let pieSVG = document.querySelectorAll(".pie");
            let pie =  pieSVG[chartref];
            // pie animation
            pie.style.strokeDasharray = 0;
            pie.getBoundingClientRect();
            pie.style.strokeDasharray = strokeNum;

            let contentPer = document.querySelectorAll(".chart-per");
            let contentArea = document.querySelectorAll(".chart-info");
            // chart info
            let content = `${percentNum}%`;

            contentPer[chartref].textContent = content;
            contentArea[chartref].style.display = "flex";
            contentArea[chartref].style.opacity = 1;
            debugger;
        }
        //fetch call
        function getChartData(event){
            event.preventDefault();
            let url = `/user/${this.getAttribute('href')}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    parseChartData(data);
                    //debugger;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    
    
        // load function for svg function // event handlers
        window.addEventListener("load", function(e) {
            let americaDots = america.contentDocument.querySelectorAll(".cls-2"),
                americaStates = america.contentDocument.querySelectorAll(".cls-1");
                //debugger;
            //function for dot change
            function dotChange(x) {
                //match dot id to title array with counter
                americaDots.forEach(dot => {
                    if(dot.id == titleArr[x]){
                        dot.style.opacity = 1;
                    } else {
                        dot.style.opacity = 0;
                    }
                });
            }
            dotChange(counter);
            //click events for svg
            left.addEventListener("click", function(e) {
                counterCheck(-1);
                conControl(counter);
                dotChange(counter);
                console.log("click");
                //debugger;
            });
            right.addEventListener("click", function(e) {
                counterCheck(1);
                conControl(counter);
                dotChange(counter);
            });
            //america states hover event handling
            americaStates.forEach(state => {
                state.addEventListener("mouseover", function(e) {
                    svgInfo.textContent = `${e.target.id}`;
                    svgInfo.style.opacity = 1;
                    e.target.style.fill = "#3dc865";
                    state.addEventListener("mouseleave", function(e) {
                        svgInfo.style.opacity = 0;
                        e.target.style.fill = "#216e37";
                    });
                    //debugger;
                });
                
            });
        });
    
        // event handle flip animation / route link
        linkUp.forEach(link => {
            link.addEventListener("click", getChartData);
            link.addEventListener("click", function(e) {
                chartref = e.target.dataset.linkref;
                let linkPar = e.target.parentElement;
                let linkParNew = linkPar.parentElement;
                linkParNew.parentElement.classList.toggle("card-flip");
                console.log(chartref);
                debugger;
            });
        }); 
    
        // get string of text needed to match
        locTitle.forEach(title => {
            let newTitle = title.textContent.split(',');
            let titleArrNew = newTitle[0].split('.').join('');
            let finTitle = titleArrNew.split(' ').join('-');
            titleArr.push(finTitle);
        });
    
        infoCon[0].classList.remove("hidden");
        console.log(titleArr);
        //debugger;
})();