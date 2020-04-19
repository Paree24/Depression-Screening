$(function(){
        var loading = $('#loadbar').hide();
        $(document)
        .ajaxStart(function () {
            loading.show();
        }).ajaxStop(function () {
                loading.hide();
        });
        ques=document.getElementById('question')
        
        var questionNo = 0;
        var correctCount = 0;
        var q = [
                {
                    'Q': 'Whether stress bothers you or interferes you during work?',
                    'C':['Sometimes', 'Often', 'Not applicable to me', 'Rarely', 'Never'],
                    'cname':'interferes_with_work'
                },
                {
                    'Q': 'Have you had any previous mental health issues or disorder?',
                    'C':['Yes', 'No', "Don't Know", 'Possibly'],
                    'cname':'prev_mental_disorder'
                },
                {
                    'Q': 'Does stress generally interfere in your daily activities?',
                    'C':['Rarely', 'Sometimes', 'Not applicable to me', 'No', 'Often', 'Never', 'Yes'],
                    'cname':'if_it_interferes'
                },
                {
                    'Q': 'Have you sought any treatment for mental health related issues?',
                    'C':['0','1'],
                    'cname':'Sought_Treatment'
                },
                {
                    'Q': 'Are you willing to share your mental health status with your friends?',
                    'C': ['No', 'Yes'],
                    'cname':'are_you_willing_to_share_with_friends'
                },
                {
                    'Q': 'Has anyone in your family have a history of mental health issues?',
                    'C': ['Yes', 'No', "I don't know"],
                    'cname':'family_history_of_mental_health'
                },
                {
                    'Q': 'Rate the emphasis on physical health in your company',
                    'C':['0','1','2','3','4','5','6','7','8','9','10'],
                    'cname':'emphasis_on_physical_health'
                },
                {
                    'Q': 'How easy is it to get medical leave for depression?',
                    'C':['Somewhat difficult', 'Somewhat easy', 'Neither easy nor difficult', "I don't know", 'Very easy', 'Difficult'],
                    'cname':'medical_leave_for_depression'
                },
                {
                    'Q': 'How many number of employees are present in your company/organization?',
                    'C':['More than 1000', '6-25', '26-100', '100-500', '500-1000', '1-5'],
                    'cname':'Number_of_employees_in_org'
                },
                {
                    'Q': 'Are mental health issues handled well by your coworkers and employers?',
                    'C':['Yes, I observed', 'No', 'Maybe/Not sure', 'Yes, I experienced'],
                    'cname':'well_handled'
                },
                {
                    'Q': 'Were you comfortable bringing up mental health issues with your previous supervisors?',
                    'C':['No, none of my previous supervisors', 'Some of my previous supervisors', 'Yes, all of my previous supervisors'],
                    'cname':'comfortable_direct_sup_previous'
                },
                {
                    'Q': 'Were you aware of the importance of mental health?',
                    'C':['No, I only became aware later', 'I was aware of some', 'Yes, I was aware of all of them', 'N/A (was not aware)'],
                    'cname':'aware_of_importance'
                },
                {
                    'Q': 'How many of your coworkers respond to you when you seeked help for previous mental/physical health issues?',
                    'C':['No, none did', 'Some did', 'Yes, they all did', "I don't know"],
                    'cname':'previous_help'
                },
                {
                    'Q': 'Is there any mental health allowance in your company/organization?',
                    'C':['Yes', 'No', 'Not eligible for coverage / NA', "I don't know"],
                    'cname':'mental_health_allowance'
                },
                {
                    'Q': 'Are you okay with bringing up your mental health issues with your employer?',
                    'C':['No', 'Yes', 'Maybe'],
                    'cname':'employer_in_interview'
                } 
        ];
        ques.innerHTML=q[0].Q
        options=document.getElementById('options')
        content=''
        for(var i=0;i<q[0].C.length;i++)
            content=content+`<li>
            <input type="radio" id="s-option" name="selector" value="`+(i+1)+`">
            <label for="f-option" class="element-animation">`+q[0].C[i]+`</label>
            <div class="check"></div>
            </li>`
        options.innerHTML = content
        req={}
        $(document.body).on('click',"label.element-animation",function (e) {
        //ripple start
            var parent, ink, d, x, y;    	
             parent = $(this);
            if(parent.find(".ink").length == 0)
                parent.prepend("<span class='ink'></span>");
                
            ink = parent.find(".ink");
            ink.removeClass("animate");
            
            if(!ink.height() && !ink.width())
            {
                d = Math.max(parent.outerWidth(), parent.outerHeight());
                ink.css({height: "100px", width: "100px"});
            }
            
             x = e.pageX - parent.offset().left - ink.width()/2;
            y = e.pageY - parent.offset().top - ink.height()/2;
            
            ink.css({top: y+'px', left: x+'px'}).addClass("animate");
        //ripple end
    
            var choice = $(this).parent().find('input:radio').val();
            console.log(q[questionNo].C[choice-1]);
            req[q[questionNo].cname]=[q[questionNo].C[choice-1]]
            setTimeout(function(){
                $('#loadbar').show();
                questionNo++;
                if((questionNo + 1) > q.length){
                    var xhr = new XMLHttpRequest();
                    console.log(req)
                    xhr.open("POST",'http://0.0.0.0:55355/screen', false);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:55355/screen');
                    xhr.setRequestHeader('Access-Control-Allow-Credentials','true');
                    xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST');
                    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
                    xhr.send(JSON.stringify(req));
                    if(xhr.responseText=='[0]')
                        window.location.replace("results.html");
                    if(xhr.responseText=='[1]')
                        window.location.replace("results.html");
                    if(xhr.responseText=='[2]')
                        window.location.replace("results.html");
                } else {
                    $('#qid').html(questionNo + 1);
                    $('input:radio').prop('checked', false);
                    setTimeout(function(){
                        $('#quiz').show();
                    }, 1500);
                    ques.innerHTML=q[questionNo].Q
                    content=''
                    for(var i=0;i<q[questionNo].C.length;i++)
                        content=content+`<li>
                        <input type="radio" id="s-option" name="selector" value="`+(i+1)+`">
                        <label for="f-option" class="element-animation">`+q[questionNo].C[i]+`</label>
                        <div class="check"></div>
                        </li>`
                    options.innerHTML = content
                }
            }, 1000);
        });
    
        
        $.fn.checking = function(qstn, ck) {
            var ans = q[questionNo].A;
            if (ck != ans)
                return false;
            else 
                return true;
        }; 
    
    // chartMake();
        function chartMake(){
    
             var chart = AmCharts.makeChart("chartdiv",
                {
                "type": "serial",
                "theme": "dark",
                "dataProvider": [{
                    "name": "Correct",
                    "points": correctCount,
                    "color": "#00FF00",
                    "bullet": "http://i2.wp.com/img2.wikia.nocookie.net/__cb20131006005440/strategy-empires/images/8/8e/Check_mark_green.png?w=250"
                }, {
                    "name": "Incorrect",
                    "points":q.length-correctCount,
                    "color": "red",
                    "bullet": "http://4vector.com/i/free-vector-x-wrong-cross-no-clip-art_103115_X_Wrong_Cross_No_clip_art_medium.png"
                }],
                "valueAxes": [{
                    "maximum": q.length,
                    "minimum": 0,
                    "axisAlpha": 0,
                    "dashLength": 4,
                    "position": "left"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
                    "bulletOffset": 10,
                    "bulletSize": 52,
                    "colorField": "color",
                    "cornerRadiusTop": 8,
                    "customBulletField": "bullet",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0,
                    "type": "column",
                    "valueField": "points"
                }],
                "marginTop": 0,
                "marginRight": 0,
                "marginLeft": 0,
                "marginBottom": 0,
                "autoMargins": false,
                "categoryField": "name",
                "categoryAxis": {
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "inside": true,
                    "tickLength": 0
                }
            });
        }
    });	
    