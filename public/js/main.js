(() => {
    
    //variables
    var infoCon = document.querySelectorAll('.info-con'),
        america = document.getElementById("america"),
        left = document.querySelector('.left'),
        right = document.querySelector('.right'),
        locTitle = document.querySelectorAll('.loc-title');
    var titleArr = [];
    var counter = 0;

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


    // load function for svg function // event handlers
    window.addEventListener("load", function(e) {
        let americaDots = america.contentDocument.querySelectorAll(".cls-2");
        function dotChange(x) {
            //match dot id to title array eith counter
            americaDots.forEach(dot => {
                if(dot.id == titleArr[x]){
                    dot.style.opacity = 1;
                } else {
                    dot.style.opacity = 0;
                }
                debugger;
            });
        }
        dotChange(counter);
        left.addEventListener("click", function(e) {
            counterCheck(-1);
            conControl(counter);
            dotChange(counter);
            console.log("click");
            debugger;
        });
        right.addEventListener("click", function(e) {
            counterCheck(1);
            conControl(counter);
            dotChange(counter);
        });
    });

    // get string of text needed to match
    locTitle.forEach(title => {
        let newTitle = title.textContent.split(',');
        let titleArrNew = newTitle[0].split('.').join('');
        let finTitle = titleArrNew.split(' ').join('-');
        //title.id = finTitle;
        titleArr.push(finTitle);
        //debugger;
    });

    infoCon[0].classList.remove("hidden");
    console.log(titleArr);
    debugger;
    




})();