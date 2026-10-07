(() => {
  'use strict';
  const Sec=window.AskSecurity||{inspect:()=>({ok:true}),rate:()=>({ok:true,wait:0}),seal:(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}},verify:()=>true,viewOnce:()=>true};
  const categories = [
    {id:'religion',name:'أسئلة دينية',icon:'☾',description:'القرآن، السيرة والعبادات',color:'#8b72bc',bg:'#f0ebf8'},
    {id:'football',name:'كرة القدم',icon:'⚽',description:'الأندية، اللاعبون والبطولات',color:'#4f9b70',bg:'#eaf5ed'},
    {id:'world',name:'أسئلة دولية',icon:'◎',description:'جغرافيا، ثقافات وعلوم',color:'#5486b7',bg:'#eaf1f8'},
    {id:'food',name:'الأكل والمشروبات',icon:'♨',description:'وصفات ومطابخ من العالم',color:'#d58a46',bg:'#fbf0e4'},
    {id:'vehicles',name:'المركبات',icon:'◉',description:'سيارات، دراجات وباصات',color:'#d26857',bg:'#f9ece9'},
    {id:'opinion',name:'رأي شخصي',icon:'✳',description:'أفكار وخيارات من وجهات نظر',color:'#a96f93',bg:'#f6eaf1'}
  ];
  const seedQuestions = [
    {id:'q1',category:'world',title:'كيف تتكوّن ظاهرة الشفق القطبي؟',body:'أشاهد صور الشفق القطبي كثيرًا وأتساءل عن سبب ألوانه الجميلة، وكيف تتفاعل الجسيمات مع الغلاف الجوي؟',answer:'يحدث الشفق القطبي عندما تصطدم جسيمات مشحونة قادمة من الشمس بذرات وغازات في الغلاف الجوي للأرض، فتُطلق تلك الذرات ضوءًا بألوان مختلفة. اللون الأخضر شائع بسبب الأكسجين على ارتفاعات معينة، بينما تنتج ألوان أخرى عن غازات وارتفاعات مختلفة.',author:'ليان',initial:'ل',avatar:'blue',date:'قبل ٤ ساعات',views:246,likes:18,dislikes:1,featured:true,tags:['علوم','فضاء','طبيعة']},
    {id:'q2',category:'football',title:'ما الفرق بين الكرة الذهبية وجائزة الأفضل من فيفا؟',body:'أسمع عن جائزتين مختلفتين لأفضل لاعب في العالم. هل تختلف طريقة التصويت أو الجهة التي تمنح كل جائزة؟',answer:'الكرة الذهبية تمنحها مجلة فرانس فوتبول، أما جائزة الأفضل (The Best) فينظمها الاتحاد الدولي لكرة القدم. تختلف آليات التصويت والجهات المشاركة في الاختيار بين الجائزتين وقد تتغير تفاصيلها من سنة إلى أخرى.',author:'عمر',initial:'ع',avatar:'green',date:'قبل ٦ ساعات',views:519,likes:34,dislikes:2,featured:true,tags:['كرة القدم','جوائز','فيفا']},
    {id:'q3',category:'food',title:'كيف أحافظ على نكهة القهوة المطحونة لفترة أطول؟',body:'أشتري حبوب القهوة وأطحن كمية تكفي عدة أيام. ما أفضل طريقة لحفظها حتى لا تفقد رائحتها بسرعة؟',answer:'الأفضل طحن القهوة قبل تحضيرها مباشرة. وإذا احتجت إلى حفظها مطحونة، ضعها في وعاء محكم الإغلاق ومعتم، بعيدًا عن الحرارة والضوء والرطوبة والروائح القوية. لا تتركها مكشوفة قرب الموقد.',author:'سارة',initial:'س',avatar:'purple',date:'أمس',views:182,likes:21,dislikes:0,featured:true,tags:['قهوة','مطبخ','نصائح']},
    {id:'q4',category:'religion',title:'ما المقصود بالتدبر عند قراءة القرآن الكريم؟',body:'أرغب أن تكون قراءتي للقرآن بتدبر، فما معنى التدبر بصورة عامة؟',answer:'التدبر عمومًا هو التأمل في معاني الآيات وفهم ما فيها من هداية وعبر والعمل بما يتيسر منها. تختلف التفاصيل بحسب السياق والتفسير، وفي المسائل الشرعية يُرجع إلى أهل العلم والمصادر الموثوقة.',author:'عبدالله',initial:'ع',avatar:'green',date:'أمس',views:307,likes:27,dislikes:1,featured:true,tags:['قرآن','تدبر','معرفة']},
    {id:'q5',category:'vehicles',title:'ما الذي تعنيه سعة المحرك باللتر؟',body:'أرى أرقامًا مثل 1.6L و2.0L في مواصفات السيارات. ماذا تصف هذه السعة، وهل تعني دائمًا أن السيارة أسرع؟',answer:'سعة المحرك هي الحجم الإجمالي الذي تتحرك فيه المكابس داخل أسطوانات المحرك، وتُقاس غالبًا باللتر. لا تعني السعة وحدها أن السيارة أسرع؛ فالأداء يتأثر أيضًا بتصميم المحرك والشحن التوربيني والوزن وناقل الحركة وعوامل أخرى.',author:'مازن',initial:'م',avatar:'blue',date:'منذ يومين',views:431,likes:16,dislikes:1,featured:false,tags:['سيارات','محركات','مواصفات']},
    {id:'q6',category:'opinion',title:'هل أبدأ بتعلّم لغة جديدة أم أطور مهارة أمتلكها؟',body:'لدي وقت فراغ محدود وأفكر بين بدء تعلّم لغة جديدة أو تخصيص الوقت لتطوير مهارة أعمل بها. كيف أختار؟',answer:'يعتمد الاختيار على هدفك الحالي وما يمنحك الحماس. جرّب تخصيص أسبوعين لكل خيار بوقت صغير وثابت، ثم قيّم الاستمرارية والفائدة التي لاحظتها. وقد يكون الجمع بينهما بجرعات قصيرة مناسبًا إذا لم يشتت تركيزك.',author:'ريم',initial:'ر',avatar:'purple',date:'منذ يومين',views:364,likes:29,dislikes:2,featured:true,tags:['تطوير الذات','رأي','وقت']},
    {id:'q7',category:'world',title:'لماذا تختلف المناطق الزمنية بين دول العالم؟',body:'كيف تم تحديد التوقيت المحلي للدول، ولماذا لا تتبع جميع الدول خطوطًا زمنية مستقيمة؟',answer:'قسّم العالم نظريًا إلى 24 منطقة زمنية تقريبًا استنادًا إلى دوران الأرض وخطوط الطول. لكن الحدود السياسية والاقتصادية واحتياجات السكان جعلت الحدود الفعلية للمناطق الزمنية غير مستقيمة، وبعض الدول اختارت فروقًا نصف ساعة أو 45 دقيقة.',author:'نور',initial:'ن',avatar:'green',date:'منذ ٣ أيام',views:209,likes:13,dislikes:0,featured:false,tags:['جغرافيا','وقت','دول']},
    {id:'q8',category:'football',title:'كيف يتأهل المنتخب إلى كأس العالم؟',body:'هل طريقة التصفيات موحدة لكل القارات، وكم منتخبًا يتأهل من كل اتحاد قاري؟',answer:'تنظم الاتحادات القارية تصفياتها وفق نظام يختلف من قارة إلى أخرى، ويحدد الاتحاد الدولي عدد المقاعد لكل اتحاد. يتغير شكل التصفيات وعدد المقاعد مع قرارات البطولة، لذا تُراجع لوائح النسخة المعنية للحصول على الأرقام الدقيقة.',author:'خالد',initial:'خ',avatar:'blue',date:'منذ ٤ أيام',views:587,likes:38,dislikes:3,featured:false,tags:['كأس العالم','منتخبات','تصفيات']},
    {id:'q9',category:'food',title:'ما الفرق بين الخَبز والتحميص في إعداد الخضار؟',body:'أريد إعداد الخضار في الفرن، فهل يختلف الخبز عن التحميص من ناحية طريقة الطهي؟',answer:'يُستخدم المصطلحان أحيانًا بالتبادل في وصف الطهي بالفرن. غالبًا يشير التحميص إلى حرارة أعلى تساعد على تحمير السطح وإبراز النكهة، بينما قد يُستخدم الخَبز لوصف طهي أبطأ أو لأطعمة أخرى. النتيجة تعتمد على الحرارة والحجم والرطوبة.',author:'دانا',initial:'د',avatar:'purple',date:'منذ ٥ أيام',views:123,likes:11,dislikes:0,featured:false,tags:['طبخ','خضار','فرن']},
    {id:'q10',category:'religion',title:'ما أهمية السيرة النبوية في فهم التاريخ الإسلامي؟',body:'كيف تساعد دراسة السيرة النبوية على فهم بدايات التاريخ الإسلامي؟',answer:'تقدم السيرة رواية لأحداث حياة النبي محمد ﷺ وسياق المجتمع في صدر الإسلام، وتساعد على فهم الخلفية التاريخية لبعض الوقائع. من المهم قراءة المصادر المحققة والرجوع إلى أهل الاختصاص عند اختلاف الروايات أو الأحكام.',author:'يوسف',initial:'ي',avatar:'blue',date:'منذ أسبوع',views:275,likes:19,dislikes:1,featured:false,tags:['السيرة','تاريخ','إسلام']}
  ];
  const verificationData = {
    q1: {
      status:'verified',
      answer:'يتكوّن الشفق القطبي عندما تتفاعل جسيمات مشحونة عالية الطاقة من الرياح الشمسية مع المجال المغناطيسي للأرض، فتُوجَّه إلى الغلاف الجوي العلوي قرب القطبين. هناك تنقل طاقتها إلى ذرات وجزيئات الغازات؛ وعند إطلاق هذه الطاقة يظهر الضوء. الأخضر هو الأكثر شيوعًا وينتج غالبًا من الأكسجين، بينما ترتبط ألوان أخرى مثل الأحمر والأزرق/البنفسجي بنوع الغاز والارتفاع وطاقة الإثارة.',
      caveat:'الإجابة الحالية صحيحة في جوهرها. وللدقة، لا تصل الجسيمات الشمسية إلى الغلاف الجوي مباشرةً على نحو متجانس؛ إذ يتوسط المجال المغناطيسي للأرض العملية ويوجّه كثيرًا من الجسيمات على طول خطوطه، ولا سيما نحو المناطق القطبية.',
      sources:[
        {institution:'NASA',title:'Auroras',url:'https://science.nasa.gov/sun/auroras/',supports_ar:'تشرح ناسا تفاعل الرياح الشمسية مع المجال المغناطيسي للأرض وإثارة غازات الغلاف الجوي وإصدار الضوء، وتربط ألوان الشفق بالأكسجين والنيتروجين.'},
        {institution:'UCAR / NSF NCAR',title:'Auroras: The Northern and Southern Lights',url:'https://scied.ucar.edu/learning-zone/sun-space-weather/aurora',supports_ar:'يشرح المصدر انتقال الجسيمات المشحونة على خطوط المجال نحو القطبين وإثارة ذرات الغلاف الجوي، مع توضيح علاقة اللون بالغاز والارتفاع.'}
      ]
    },
    q2: {
      status:'verified',
      answer:'الكرة الذهبية تنظّمها مجلة «فرانس فوتبول»؛ وفي لائحة 2026 يتولى صحفيون متخصصون التصويت، بُمثّل واحد لكل دولة ضمن أعلى التصنيفات. أما جوائز «The Best FIFA Football Awards» فتنظمها فيفا؛ وفي فئات اللاعب/المدرب/الحارس الرئيسية لعام 2025 تشترك أربع كتل متساوية الوزن: مدربو المنتخبات وقادتها والصحفيون المتخصصون والجماهير المسجلة. لذلك فالفارق الجوهري هو الجهة المنظمة وهيئة التصويت. ويُنظَّم حفل الكرة الذهبية مع يويفا، لكن ذلك لا يغيّر أن «فرانس فوتبول» هي منظِّمة الجائزة والتصويت.',
      caveat:'تفاصيل الأهلية وفترة التقييم والقوائم وإجراءات التصويت تخص كل نسخة وقد تُحدَّث؛ ووصف كتل التصويت الأربع يخص الفئات الرئيسية في نسخة The Best 2025.',
      sources:[
        {institution:'Ballon d’Or / France Football',title:'Check all the Criteria and Full Regulations to understand Ballon d’Or 2026 trophy',url:'https://ballondor.com/news/posts/check-all-the-criteria-and-full-regulations-to-understand-ballon-dor-2026-trophy',supports_ar:'تنص لائحة 2026 على تنظيم فرانس فوتبول للجائزة والتصويت عبر لجنة من الصحفيين المتخصصين، وتذكر تنظيم الحفل بالمشاركة مع يويفا.'},
        {institution:'FIFA',title:'The Best FIFA Football Awards 2025: shortlist voting phase now open',url:'https://www.fifa.com/en/the-best-fifa-football-awards/2025/articles/shortlist-voting-phase-now-open',supports_ar:'توضح فيفا أن مدربي المنتخبات وقادتها والصحفيين والجماهير المسجلة يشاركون في التصويت، بوزن 25% لكل فئة من الفئات الرئيسية المذكورة.'}
      ]
    },
    q3: {
      status:'verified',
      answer:'الأفضل شراء البن حبوبًا وطحن الكمية اللازمة مباشرة قبل التحضير. وإذا احتجت إلى حفظ القهوة مطحونة، فضعها في وعاء محكم الإغلاق ومعتم، في خزانة باردة ومظلمة، بعيدًا عن الحرارة والضوء والرطوبة والروائح القوية؛ لذلك لا تتركها مكشوفة قرب الموقد.',
      caveat:'هذه الإجراءات تُبطئ فقدان النكهة ولا توقفه تمامًا؛ فالقهوة المطحونة تفقد نضارتها أسرع من الحبوب، لذا اشترِ أو اطحن كميات صغيرة واستخدمها قريبًا. لا توجد مدة ثابتة واحدة تناسب كل طرق التحميص والتعبئة والتخزين.',
      sources:[
        {institution:'National Coffee Association',title:'Storage and shelf life',url:'https://www.aboutcoffee.org/beans/storage-and-shelf-life/',supports_ar:'توصي بطحن القهوة وقت التحضير وتخزينها في وعاء محكم ومعتم ومكان بارد ومظلم، وتعد الهواء والرطوبة والحرارة والضوء والروائح عوامل مؤثرة في النكهة.'},
        {institution:'Harvard T.H. Chan School of Public Health',title:'Coffee',url:'https://nutritionsource.hsph.harvard.edu/food-features/coffee/',supports_ar:'توصي بحفظ البن أو القهوة المطحونة في وعاء محكم ومعتم داخل خزانة باردة ومظلمة، بعيدًا عن الشمس والهواء والرطوبة والحرارة.'},
        {institution:'Food Science & Nutrition / PubMed Central',title:'Changes in sensory quality characteristics of coffee during storage',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3951592/',supports_ar:'دراسة محكّمة تناقش أثر الرطوبة والهواء/الأكسجين والضوء والروائح الخارجية في تغير جودة القهوة أثناء التخزين.'}
      ]
    },
    q4: {
      status:'verified',
      answer:'التدبر عند قراءة القرآن هو التأمل والتفهم لمعاني الآيات ومقاصدها، والاعتبار بهداياتها، بقصد الانتفاع والعمل بما دلت عليه بحسب العلم والقدرة. وليس هو التكلّف في استخراج معانٍ لا دليل عليها.',
      caveat:'الإجابة الحالية موافقة للمصادر في جوهرها. وعند الإشكال في معنى آية أو عند بناء حكم شرعي تفصيلي، يُرجع إلى التفسير المعتبر وأهل العلم، ولا يُتكلّم في القرآن بغير علم.',
      sources:[
        {institution:'مؤسسة الشيخ عبد العزيز بن باز الخيرية',title:'صفة تدبر القرآن',url:'https://binbaz.org.sa/fatwas/10254/%D8%B5%D9%81%D8%A9-%D8%AA%D8%AF%D8%A8%D8%B1-%D8%A7%D9%84%D9%82%D8%B1%D8%A7%D9%86',supports_ar:'يعرّف التدبر بأنه التعقل والتفهم لمعنى الآية ومرادها ثم العمل به، ويوجه إلى سؤال أهل العلم عند الجهل أو التردد.'},
        {institution:'الإسلام سؤال وجواب',title:'هل تدبر القرآن فرض؟',url:'https://islamqa.info/ar/answers/312089',supports_ar:'يشرح التدبر بوصفه إعمال الفكر والتأمل والتفهم في الآيات للوصول إلى معانيها ومقاصدها والعمل بها، مع التحذير من القول في القرآن بغير علم.'},
        {institution:'إسلام ويب',title:'قراءة القرآن بالتدبر هي المقصود الأعظم والمطلوب الأهم',url:'https://www.islamweb.net/ar/fatwa/25371/%D9%82%D8%B1%D8%A7%D8%A1%D8%A9-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%A8%D8%A7%D9%84%D8%AA%D8%AF%D8%A8%D8%B1-%D9%87%D9%8A-%D8%A7%D9%84%D9%85%D9%82%D8%B5%D9%88%D8%AF-%D8%A7%D9%84%D8%A3%D8%B9%D8%B8%D9%85-%D9%88%D8%A7%D9%84%D9%85%D8%B7%D9%84%D9%88%D8%A8-%D8%A7%D9%84%D8%A3%D9%87%D9%85',supports_ar:'يشرح التدبر بالتفكر في المعاني وتأمل الأوامر والنواهي والقصص والأمثال والاعتبار بما فيها.'}
      ]
    },
    q5: {
      status:'verified',
      answer:'سعة المحرك باللتر هي إزاحته: مجموع الحجم الذي تمسحه المكابس داخل جميع الأسطوانات أثناء انتقالها بين أعلى وأسفل مشوارها، ويُعبَّر عنها غالبًا باللتر (مثل 2.0 لتر). وهي لا تكفي وحدها للحكم على سرعة السيارة أو أدائها؛ فقدرة المحرك تتأثر أيضًا بضغط الأسطوانات وسرعة دورانه والتصميم والشحن الجبري مثل التوربو، ثم تؤثر منظومة نقل الحركة وكتلة السيارة في الأداء الفعلي على الطريق.',
      caveat:'المقصود هو حجم الإزاحة أو الحجم الممسوح للمكابس، لا الحجم الكلي للأسطوانة عند وجود المكبس في أدنى موضعه. لذلك لا يُستنتج أيّ السيارتين أسرع اعتمادًا على رقم اللترات وحده.',
      sources:[
        {institution:'Embry-Riddle Aeronautical University',title:'Piston Engines – Introduction to Aerospace Flight Vehicles',url:'https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/reciprocating-engine-propeller/',supports_ar:'يعرّف الحجم الممسوح للأسطوانة بأنه الفرق بين حجمها عند أدنى وأعلى موضع للمكبس؛ والإزاحة الكلية هذا الحجم مضروبًا في عدد الأسطوانات. ويناقش علاقة القدرة بالضغط وسرعة الدوران والشحن الجبري.'},
        {institution:'City of Portland, Oregon',title:'Finding Diesel Engine Details',url:'https://www.portland.gov/procurement/clean-air-construction/documents/finding-engine-details-cac-registration/download',supports_ar:'تعرف إزاحة المحرك بأنها الحجم الممسوح المجمع للمكابس داخل الأسطوانات، وتوضح احتسابها من قطر الأسطوانة والشوط وعدد الأسطوانات وكتابة الإزاحة باللتر.'},
        {institution:'Sandia National Laboratories / U.S. Department of Energy',title:'Alternative Fuels Direct-Injection Spark-Ignition Engine Laboratory',url:'https://crf.sandia.gov/research/engine-combustion/alternative-fuels-direct-injection-spark-ignition-engine-laboratory/',supports_ar:'يعرض مختبر سانديا مثالًا للمحرك وسعته الحجمية باللتر في وصف تجهيزاته البحثية.'}
      ]
    },
    q6: {
      status:'opinion',
      answer:'لا توجد أفضلية عامة مثبتة بين تعلّم لغة جديدة وتعميق مهارة قائمة؛ فالأنسب يتحدد بحسب هدفك العملي واهتمامك والوقت الذي تستطيع تخصيصه باستمرار. حدّد هدفًا واضحًا لكل خيار، وراقب التقدم والالتزام، ثم اختر ما يحقق فائدة أوضح. إذا كانت لديك فجوة محددة في مهارة قائمة، فركّز عليها بممارسة هادفة وتغذية راجعة. ويمكن الجمع بينهما إذا ظل الوقت كافيًا للتقدم في كل منهما.',
      caveat:'هذا سؤال رأي وإرشاد شخصي، وليس له جواب واحد صحيح للجميع. لا يثبت أي من المصادر أن أسبوعين مدة مثلى للمقارنة، أو أن الجمع بين المسارين أفضل. ودليل الممارسة الهادفة أدناه من سياق المهارات السريرية، فلا يُعمم لحسم الخيار بين اللغة والمهارة.',
      sources:[
        {institution:'الجمعية الأمريكية لعلم النفس (APA)',title:'Developing responsible and autonomous learners: A key to motivating students',url:'https://www.apa.org/education-career/k12/learners',supports_ar:'تشرح أهمية إتاحة الاختيار المناسب وملكية المتعلم للقرار في الدافعية، وتوصي بالتعلم من التجربة ومراقبة النتائج.'},
        {institution:'وزارة التعليم الأمريكية — LINCS / TEAL Center',title:'TEAL Center Fact Sheet No. 3: Self-Regulated Learning',url:'https://lincs.ed.gov/federal-initiatives/teal/guide/selfregulated',supports_ar:'يعرض تحديد الأهداف ومراقبة التقدم وتعديل الاستراتيجيات ضمن التعلم المنظم ذاتيًا؛ ولا يقرر أي المسارين أنسب لكل شخص.'},
        {institution:'BMC Medical Education / PubMed',title:'The role of deliberate practice in the acquisition of clinical skills',url:'https://pubmed.ncbi.nlm.nih.gov/22141427/',supports_ar:'دراسة عن الممارسة الهادفة في المهارات السريرية؛ تدعم معالجة نقاط الضعف بالممارسة والتغذية الراجعة ضمن هذا السياق، ولا تحسم المفاضلة الشخصية بين تعلّم لغة وتطوير مهارة.'}
      ]
    },
    q7: {
      status:'verified',
      answer:'يقوم النموذج الفلكي المثالي على 24 نطاقًا، لأن الأرض تدور 360° في 24 ساعة (نحو 15° لكل ساعة). لكن التوقيت المدني تحدده الحكومات لا خطوط الطول وحدها؛ لذلك تتأثر حدوده بالموقع الجغرافي والحدود والاعتبارات السياسية والاقتصادية وتنسيق الحياة اليومية، فتبدو غير مستقيمة. وتوجد فروق غير كاملة عن UTC، مثل الهند (+5:30) ونيبال (+5:45).',
      caveat:'رقم 24 نموذج نظري تقريبي، لا وصف دقيق لعدد أو حدود المناطق المدنية الفعلية. كما أن الموقع الجغرافي عامل رئيسي؛ ولا يمكن نسبة كل انحراف عن خطوط الطول إلى الاقتصاد أو احتياجات السكان وحدها، فالقواعد قرارات حكومية قابلة للتغيير.',
      sources:[
        {institution:'NOAA — National Ocean Service',title:'What is longitude?',url:'https://oceanservice.noaa.gov/facts/longitude.html',supports_ar:'توضح أن الأرض تدور 360 درجة في 24 ساعة، أي 15 درجة في الساعة، وأن حدود المناطق الزمنية الفعلية تتبع القوانين المحلية.'},
        {institution:'National Geographic Society',title:'MapMaker: Time Zones',url:'https://education.nationalgeographic.org/resource/mapmaker-world-time-zones/',supports_ar:'تشرح النموذج النظري ذي 24 منطقة وخطوط طول متباعدة 15 درجة، وتوضح اختلاف التطبيق بسبب قرارات سياسية وجغرافية ومنها أنصاف الساعات.'},
        {institution:'IANA — Internet Assigned Numbers Authority',title:'Time Zones',url:'https://www.iana.org/time-zones',supports_ar:'توضح أن قاعدة المناطق الزمنية تتبع تغييرات الجهات السياسية في الحدود وفروق UTC وقواعد التوقيت الصيفي، أي أن التوقيت المدني تنظيمي ومتغير.'},
        {institution:'Time and Date AS',title:'How Are Time Zones Decided?',url:'https://www.timeanddate.com/time/time-zones-decided.html',supports_ar:'يوضح أثر الموقع والقرارات العملية والسياسية، مع أمثلة للهند UTC+5:30 ونيبال UTC+5:45.'}
      ]
    },
    q8: {
      status:'verified',
      answer:'يتأهل المنتخب عادةً عبر التصفيات التي يديرها اتحاده القاري؛ وتختلف المراحل وعدد المقاعد وطريقة التأهل المباشر أو عبر الملحق بين القارات. يقرّ FIFA توزيع المقاعد ولوائح كل نسخة، وقد تتأهل الدولة المستضيفة تلقائيًا إذا نصّت اللوائح على ذلك. لذلك تُراجع لائحة وتصفيات النسخة المعنية للأرقام والتفاصيل الدقيقة.',
      caveat:'الإجابة عامة وصحيحة، لكن أعداد المقاعد ونظام التصفيات لا تُعمَّم بين النسخ. أرقام لائحة كأس العالم 2026 تخص تلك النسخة تحديدًا، وتشمل تأهل البلدان المستضيفة الثلاثة تلقائيًا.',
      sources:[
        {institution:'FIFA',title:'2026 FIFA World Cup Regulations — المادة 11: عدد المنتخبات',url:'https://digitalhub.fifa.com/m/636f5c9c6f29771f/original/FWC2026_regulations_EN.pdf',supports_ar:'تنص اللائحة على عدد المنتخبات وتوزيع المقاعد على الاتحادات القارية، وعلى التأهل التلقائي لكندا والمكسيك والولايات المتحدة بصفتها مستضيفة نسخة 2026.'},
        {institution:'الاتحاد الآسيوي لكرة القدم (AFC)',title:'Asia’s pathway to the FIFA World Cup 2026 and AFC Asian Cup 2027 confirmed',url:'https://www.the-afc.com/en/more/afc_competitions/news/asia%E2%80%99s_pathway_to_the_fifa_world_cup_2026_and_afc_asian_cup%E2%84%A2_2027_confirmed.html',supports_ar:'يوضح نظام تصفيات آسيا متعدد المراحل، مع تأهل مباشر وملحق آسيوي واحتمال ملحق بين القارات؛ مثال رسمي على اختلاف الآلية حسب الاتحاد القاري.'}
      ]
    },
    q9: {
      status:'partial',
      answer:'كلاهما طهيٌ بالحرارة الجافة داخل الفرن، وقد يتداخل الاسمان في الاستعمال. لكن في الإرشادات الشائعة يُحضَّر تحميص الخضار بحرارة أعلى (نحو 204–220°م / 400–425°ف أو أكثر) لتعزيز التحمير والقرمشة والكرملة والنكهة، بينما يُستعمل الخَبز غالبًا لحرارة أخفض ولأطعمة يتغير قوامها كالخبز والكيك. وللخضار تؤثر الحرارة وحجم القطع وتباعدها في سرعة النضج ودرجة التحمير.',
      caveat:'تمت مراجعة الإجابة مع تحفظ: الفصل بين الاسمين اصطلاحي وإرشادي وليس قاعدة عالمية ثابتة، وكون الخَبز أبطأ ليس تعريفًا لازمًا. كما أن المصادر تدعم أثر الحرارة وحجم القطع وتباعدها، لا الرطوبة وحدها بوصفها معيارًا فاصلًا.',
      sources:[
        {institution:'University of Florida — UF/IFAS Extension',title:'Dry Heat: Baking, Roasting, and Broiling',url:'https://ask.ifas.ufl.edu/publication/FY1501',supports_ar:'يوضح أن الخَبز والتحميص قد يستعملان بالتبادل وأن كليهما حرارة جافة، مع توجيه شائع لحرارة أعلى للتحميص وإمكان تحميص الخضار.'},
        {institution:'University of Tennessee — Healthy Families Tennessee',title:'Roasted Vegetables',url:'https://www.healthyfamilies.tennessee.edu/recipes/roasted-vegetables/',supports_ar:'يوصي بتحميص الخضار عند 425°ف، ويوضح أثر الحرارة المرتفعة والهواء حول القطع والزيت في التحمير والكرملة والنكهة.'},
        {institution:'Mississippi State University Extension',title:'Roast Vegetables',url:'https://happyhealthy.extension.msstate.edu/tips-videos/roast-vegetables',supports_ar:'يوصي بحرارة 400°ف وبقطع متقاربة الحجم، ويذكر اختلاف وقت التحميص حسب نوع الخضار وصلابته.'}
      ]
    },
    q10: {
      status:'verified',
      answer:'السيرة النبوية مصدر محوري لفهم مرحلة النبوة وبدايات التاريخ الإسلامي؛ فهي تعرض حياة النبي محمد ﷺ ومسار الدعوة في مكة والمدينة، وتعين—مع القرآن والحديث والمصادر التاريخية الأخرى—على وضع الوقائع في سياقها وفهم تطور المجتمع الإسلامي الأول. وينبغي عند اختلاف الروايات أو تعلق الأمر بحكم شرعي الرجوع إلى المصادر المحققة وأهل الاختصاص، لا إلى خبر منفرد.',
      caveat:'ليست روايات السيرة كلها في درجة واحدة من الثبوت؛ لذلك يلزم نقد الإسناد والمتن ومقارنة المصادر. واستنباط الأحكام لا يُبنى على قصة مجردة، بل على الأدلة وقواعد الفقه.',
      sources:[
        {institution:'وزارة الأوقاف المصرية',title:'السيرة',url:'https://awkafonline.gov.eg/content-sections/98/2830/%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9',supports_ar:'تعرف السيرة بأنها سجل لحياة النبي ﷺ، وتذكر مسار الدعوة في مكة والمدينة ومصادر دراستها كالقرآن والحديث والمغازي وكتب التاريخ.'},
        {institution:'جامعة الأزهر — الرابطة العالمية لخريجي الأزهر',title:'السيرة النبوية | المستوى الأول والثاني',url:'https://sis.azharegypt.edu.eg/portal/page2.php?page=3&page1=5&page2=17',supports_ar:'يعرض دراسة تحليلية للسيرة تركز على الأحداث الصحيحة وتنمية النقد والبحث والتحري.'},
        {institution:'إسلام ويب — الدكتور أكرم ضياء العمري',title:'أهم مصادر السيرة النبوية',url:'https://www.islamweb.net/ar/article/14184/%D8%A3%D9%87%D9%85-%D9%85%D8%B5%D8%A7%D8%AF%D8%B1-%D8%A7%D9%84%D8%B3%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A%D8%A9',supports_ar:'يناقش القرآن والحديث وكتب السيرة ومصادر دراسة المرحلة، ويذكر تفاوت قبول النقاد للروايات بما يدعم ضرورة التحقق النقدي.'}
      ]
    }
  };
  seedQuestions.forEach(question=>{const review=verificationData[question.id];if(review)Object.assign(question,review)});
  const STORAGE_KEY='askme.questions.v2', LEGACY_STORAGE_KEY='askme.questions.v1', THEME_KEY='askme.theme.v1', REACTIONS_KEY='askme.reactions.v1';
  const safeRead=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key));return value??fallback}catch{return fallback}};
  const validCategoryIds=new Set(categories.map(category=>category.id));
  const boundedNumber=(value,max=100000000)=>Number.isFinite(Number(value))?Math.max(0,Math.min(max,Math.floor(Number(value)))):0;
  const safeStoredText=(value,max)=>typeof value==='string'?value.slice(0,max):'';
  function validateStoredQuestion(q){
    if(!q||typeof q!=='object'||typeof q.id!=='string'||!/^[-a-zA-Z0-9_]{1,48}$/.test(q.id)||!validCategoryIds.has(q.category)||typeof q.title!=='string'||typeof q.body!=='string')return null;
    const sources=Array.isArray(q.sources)?q.sources.slice(0,8).filter(src=>src&&typeof src==='object'&&typeof src.url==='string'&&/^https:\/\//i.test(src.url)).map(src=>({institution:safeStoredText(src.institution,100),title:safeStoredText(src.title,200),url:safeStoredText(src.url,500),supports_ar:safeStoredText(src.supports_ar,400)})):[];
    return {...q,title:safeStoredText(q.title,110),body:safeStoredText(q.body,900),answer:safeStoredText(q.answer,1200),author:safeStoredText(q.author,60),initial:safeStoredText(q.initial,2),avatar:['blue','green','purple'].includes(q.avatar)?q.avatar:'',date:safeStoredText(q.date,50),views:boundedNumber(q.views),likes:boundedNumber(q.likes,100000),dislikes:boundedNumber(q.dislikes,100000),featured:q.featured===true,tags:Array.isArray(q.tags)?q.tags.slice(0,12).map(tag=>safeStoredText(tag,40)):[],sources,status:['verified','partial','opinion','pending','community'].includes(q.status)?q.status:'pending',communityAnswers:Array.isArray(q.communityAnswers)?q.communityAnswers.slice(0,10).filter(a=>a&&typeof a.text==='string').map(a=>({text:safeStoredText(a.text,900),date:safeStoredText(a.date,50)})):[]};
  }
  const loadedQuestions=Sec.verify(STORAGE_KEY)?safeRead(STORAGE_KEY,safeRead(LEGACY_STORAGE_KEY,null)):null;
  const loadedById=new Map(Array.isArray(loadedQuestions)?loadedQuestions.filter(q=>q&&typeof q.id==='string').map(q=>[q.id,q]):[]);
  const seedIds=new Set(seedQuestions.map(q=>q.id));
  const questions=[...seedQuestions.map(seed=>{const saved=loadedById.get(seed.id)||{};return validateStoredQuestion({...seed,views:boundedNumber(saved.views,100000000)||seed.views,likes:boundedNumber(saved.likes,100000)||seed.likes,dislikes:boundedNumber(saved.dislikes,100000)||seed.dislikes})}).filter(Boolean),...(Array.isArray(loadedQuestions)?loadedQuestions.filter(q=>q&&!seedIds.has(q.id)).map(validateStoredQuestion).filter(Boolean):[])].slice(0,110);
  const savedReactions=Sec.verify(REACTIONS_KEY)?safeRead(REACTIONS_KEY,{}):{};
  let reactions=savedReactions&&typeof savedReactions==='object'&&!Array.isArray(savedReactions)?Object.fromEntries(Object.entries(savedReactions).filter(([id,value])=>/^[-a-zA-Z0-9_]{1,48}$/.test(id)&&['like','dislike'].includes(value)).slice(0,300)):{};
  let activeTab='featured',activeCategory='',searchTerm='',toastTimer;
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const categoryFor=id=>categories.find(category=>category.id===id)||categories[0];
  const save=()=>{if(!Sec.seal(STORAGE_KEY,JSON.stringify(questions))||!Sec.seal(REACTIONS_KEY,JSON.stringify(reactions)))showToast('تعذر حفظ التغييرات: المساحة المحلية ممتلئة أو غير متاحة.')};
  const formatCount=value=>new Intl.NumberFormat('ar').format(value);
  const showToast=message=>{const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)};

  function renderCategories(){
    const grid=$('#categoryGrid');
    grid.innerHTML=categories.map(category=>{const count=questions.filter(q=>q.category===category.id).length;return `<button class="category-card cat-${category.id} ${activeCategory===category.id?'is-active':''}" type="button" data-category="${category.id}"><span class="category-count">${formatCount(count)} أسئلة</span><span class="category-icon" aria-hidden="true">${category.icon}</span><h3>${escapeHTML(category.name)}</h3><p>${escapeHTML(category.description)}</p></button>`}).join('');
    $('#askCategory').innerHTML='<option value="">اختر القسم المناسب</option>'+categories.map(category=>`<option value="${category.id}">${escapeHTML(category.name)}</option>`).join('');
  }
  function searchableText(question){const category=categoryFor(question.category);return [question.title,question.body,question.answer||'',category.name,...(question.tags||[])].join(' ').toLocaleLowerCase('ar')}
  function getVisibleQuestions(){let items=questions.filter(question=>!activeCategory||question.category===activeCategory);if(searchTerm)items=items.filter(question=>searchableText(question).includes(searchTerm.toLocaleLowerCase('ar')));if(activeTab==='new')items.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))||questions.indexOf(b)-questions.indexOf(a));else if(activeTab==='popular')items.sort((a,b)=>(b.likes+b.views/10)-(a.likes+a.views/10));else items.sort((a,b)=>Number(b.featured)-Number(a.featured)||b.likes-a.likes);return items}
  function renderQuestionCard(question){
    const category=categoryFor(question.category),excerpt=question.body.length>118?question.body.slice(0,118)+'…':question.body;
    const badge=question.status==='verified'?'<span class="review-status status-verified">موثّق</span>':question.status==='partial'?'<span class="review-status status-partial">مراجَع مع تحفظ</span>':question.status==='opinion'?'<span class="review-status status-opinion">رأي</span>':'<span class="review-status status-pending">غير مراجَع</span>';
    return `<article class="question-card" role="button" tabindex="0" data-question="${escapeHTML(question.id)}" aria-label="فتح السؤال: ${escapeHTML(question.title)}"><div class="question-card-top"><span class="category-pill cat-${category.id}">${escapeHTML(category.name)}</span>${question.featured?'<span class="featured-label">✦ سؤال مميز</span>':''}${badge}</div><h3>${escapeHTML(question.title)}</h3><p class="question-excerpt">${escapeHTML(excerpt)}</p><div class="question-card-bottom"><span class="question-author"><span class="author-avatar ${escapeHTML(question.avatar||'')}">${escapeHTML(question.initial||question.author?.slice(0,1)||'؟')}</span>${escapeHTML(question.author||'عضو')}</span><span class="question-metric">◷ ${escapeHTML(question.date||'حديثًا')}</span><span class="question-metric">♡ ${formatCount(question.likes||0)}</span><span class="question-metric">◉ ${formatCount(question.views||0)}</span></div></article>`
  }
  function renderQuestions(){const items=getVisibleQuestions();$('#questionList').innerHTML=items.map(renderQuestionCard).join('');$('#emptyState').hidden=items.length>0;$('#questionList').hidden=items.length===0;const base=searchTerm?`نتائج البحث عن «${searchTerm}»`:activeCategory?`أسئلة ${categoryFor(activeCategory).name}`:activeTab==='new'?'أحدث الأسئلة':activeTab==='popular'?'الأسئلة الأكثر تفاعلًا':'أسئلة تستحق القراءة';$('#questionsTitle').textContent=base;$('#questionsSubtitle').textContent=searchTerm?`عثرنا على ${formatCount(items.length)} من الأسئلة المطابقة`:'تعرّف على ما يشغل بال مجتمعنا اليوم';renderTrending();updateStats()}
  function renderTrending(){const list=[...questions].sort((a,b)=>(b.views+b.likes*5)-(a.views+a.likes*5)).slice(0,4);$('#trendList').innerHTML=list.map((question,index)=>`<div class="trend-item" role="button" tabindex="0" data-question="${escapeHTML(question.id)}"><span class="trend-number">${String(index+1).padStart(2,'0')}</span><span><strong>${escapeHTML(question.title)}</strong><small>${formatCount(question.views)} مشاهدة · ${escapeHTML(categoryFor(question.category).name)}</small></span></div>`).join('')}
  function updateStats(){$('#questionCount').textContent=formatCount(questions.length);$('#answerCount').textContent=formatCount(questions.reduce((total,q)=>total+Number(Boolean(q.answer))+((q.communityAnswers||[]).length),0));$('#memberCount').textContent=formatCount(new Set(questions.map(q=>q.author).filter(Boolean)).size);$('#currentYear').textContent=new Date().getFullYear()}
  function setTab(tab){activeTab=tab;$$('.question-tab').forEach(button=>{const selected=button.dataset.tab===tab;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected))});renderQuestions()}
  function clearFilters(){activeCategory='';searchTerm='';$('#searchInput').value='';$$('.category-card').forEach(card=>card.classList.remove('is-active'));renderCategories();renderQuestions()}

  function openModal(id){const modal=$(id);if(!modal)return;modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('input,select,textarea,button')?.focus(),40)}
  function closeModal(modal){modal.hidden=true;if(!document.querySelector('.modal-backdrop:not([hidden])'))document.body.classList.remove('modal-open')}
  function sourceMarkup(sources){
    const valid=(Array.isArray(sources)?sources:[]).map(source=>{
      try{const url=new URL(source.url);if(url.protocol!=='https:')return null;return {...source,url:url.href}}catch{return null}
    }).filter(Boolean);
    if(!valid.length)return '';
    return `<div class="sources-box"><h3>مصادر موثوقة</h3><ul>${valid.map(source=>`<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.institution)} — ${escapeHTML(source.title)}</a><small>${escapeHTML(source.supports_ar)}</small></li>`).join('')}</ul></div>`;
  }
  function openQuestion(id,countView=true){
    const question=questions.find(item=>item.id===id);if(!question)return;
    if(countView&&Sec.viewOnce(id)){question.views=(question.views||0)+1;save()}
    const category=categoryFor(question.category),reaction=reactions[id]||'';
    const similar=questions.filter(item=>item.id!==id&&item.category===question.category).slice(0,3);
    const detail=$('#questionDetail');
    const statusText=question.status==='verified'?'تمت مراجعته بمصادر موثوقة':question.status==='partial'?'مراجَع بمصادر مع تحفظات موضحة':question.status==='opinion'?'رأي شخصي — ليس حقيقة قابلة للتحقق':'مساهمة من المجتمع — لم تُراجع بعد';
    const mainAnswer=question.answer?`<div class="detail-answer"><div class="answer-label">${question.status==='verified'?'إجابة موثقة':question.status==='partial'?'إجابة مراجَعة مع تحفظ':question.status==='opinion'?'وجهة نظر عامة':'إجابة غير مراجعة'}</div><p>${escapeHTML(question.answer)}</p></div>`:`<div class="detail-answer"><div class="answer-label">بانتظار إجابة موثوقة</div><p>لا توجد إجابة مرجعية بعد. المساهمات الجديدة من المجتمع ستظهر على أنها غير مراجعة.</p></div>`;
    const communityAnswers=Array.isArray(question.communityAnswers)?question.communityAnswers:[];
    detail.innerHTML=`<span class="category-pill detail-category cat-${category.id}">${escapeHTML(category.name)}</span><span class="review-status ${question.status==='verified'?'status-verified':question.status==='partial'?'status-partial':question.status==='opinion'?'status-opinion':'status-pending'}">${statusText}</span><h2 class="detail-title" id="detailTitle">${escapeHTML(question.title)}</h2><div class="detail-meta"><span>بواسطة ${escapeHTML(question.author||'عضو')}</span><span>◷ ${escapeHTML(question.date||'حديثًا')}</span><span>◉ ${formatCount(question.views)} مشاهدة</span></div><div class="detail-body">${escapeHTML(question.body)}</div>${question.caveat?`<div class="content-caveat">${escapeHTML(question.caveat)}</div>`:''}${mainAnswer}${sourceMarkup(question.sources)}${communityAnswers.map((item,index)=>`<div class="detail-answer community-answer"><div class="answer-label">مساهمة مجتمعية ${index+1} — غير متحققة</div><p>${escapeHTML(item.text)}</p><small>${escapeHTML(item.date||'')}</small></div>`).join('')}<div class="detail-actions"><button class="reaction-button ${reaction==='like'?'selected':''}" type="button" data-react="like" data-id="${escapeHTML(id)}">👍 مفيد <span>${formatCount(question.likes||0)}</span></button><button class="reaction-button dislike ${reaction==='dislike'?'selected':''}" type="button" data-react="dislike" data-id="${escapeHTML(id)}">👎 <span>${formatCount(question.dislikes||0)}</span></button><span class="question-metric">◉ ${formatCount(question.views)} مشاهدة</span></div><form class="detail-answer-form" data-answer-form="${escapeHTML(id)}"><label for="answerInput">أضف مساهمة أو إجابة</label><textarea id="answerInput" name="answer" rows="3" maxlength="900" placeholder="اكتب إجابة محترمة، واستشهد بمصدر إن أمكن..."></textarea><small class="answer-disclaimer">لن تُعرض المساهمة على أنها موثّقة؛ يلزم التحقق من مصادرها.</small><button class="button button-primary" type="submit">إرسال الإجابة <span>←</span></button></form>${similar.length?`<div class="similar-list"><h3>أسئلة مشابهة</h3>${similar.map(item=>`<a class="similar-link" href="#" data-question="${escapeHTML(item.id)}">${escapeHTML(item.title)} ←</a>`).join('')}</div>`:''}`;
    openModal('#questionModal');renderQuestions();
  }

  const privacyPattern=/(\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|(?:\+?[\p{N}][\p{N}\s().-]{6,}[\p{N}]))/iu;
  const dangerousSchemePattern=/(?:javascript|vbscript|data)\s*:/i;
  function normalizeInput(value){return String(value||'').normalize('NFC').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g,'').trim()}
  function allowRate(action,limit,windowMs){const key=`askme.rate.${action}`;const now=Date.now();let timestamps=safeRead(key,[]);if(!Array.isArray(timestamps))timestamps=[];timestamps=timestamps.filter(time=>Number.isFinite(time)&&now-time<windowMs);if(timestamps.length>=limit)return false;timestamps.push(now);try{localStorage.setItem(key,JSON.stringify(timestamps))}catch{}return true}
  function setError(message){const error=$('#formError');error.textContent=message;error.hidden=!message}
  function updateCounters(){const title=$('#askTitle').value;const body=$('#askBody').value;$('#titleCount').textContent=`${title.length}/110`;$('#bodyCount').textContent=`${body.length}/900`}

  // Search and category filtering
  $('#searchForm').addEventListener('submit',event=>{event.preventDefault();searchTerm=$('#searchInput').value.trim();activeCategory='';renderCategories();renderQuestions();$('#questions').scrollIntoView({behavior:'smooth'});if(!searchTerm)showToast('اكتب كلمة أو سؤالًا للبحث')});
  $('#searchInput').addEventListener('input',event=>{if(event.target.value.trim().length>=2){searchTerm=event.target.value.trim();activeCategory='';renderCategories();renderQuestions()}});
  document.addEventListener('click',event=>{
    const categoryButton=event.target.closest('[data-category]');if(categoryButton){activeCategory=activeCategory===categoryButton.dataset.category?'':categoryButton.dataset.category;searchTerm='';$('#searchInput').value='';renderCategories();renderQuestions();$('#questions').scrollIntoView({behavior:'smooth'});return}
    if(event.target.closest('[data-open-ask]')){event.preventDefault();setError('');openModal('#askModal');return}
    if(event.target.closest('[data-show-all]')){event.preventDefault();clearFilters();$('#questions').scrollIntoView({behavior:'smooth'});return}
    const react=event.target.closest('[data-react]');if(react){if(!event.isTrusted)return;const rl=Sec.rate('react');if(!rl.ok){showToast(`تفاعلات كثيرة، انتظر ${rl.wait} ثانية`);return}const id=react.dataset.id;const kind=react.dataset.react;const question=questions.find(item=>item.id===id);if(!question)return;const previous=reactions[id];if(previous===kind){question[kind==='like'?'likes':'dislikes']=Math.max(0,(question[kind==='like'?'likes':'dislikes']||0)-1);delete reactions[id]}else{if(previous)question[previous==='like'?'likes':'dislikes']=Math.max(0,(question[previous==='like'?'likes':'dislikes']||0)-1);question[kind==='like'?'likes':'dislikes']=(question[kind==='like'?'likes':'dislikes']||0)+1;reactions[id]=kind}save();openQuestion(id,false);return}
    const questionLink=event.target.closest('[data-question]');if(questionLink){event.preventDefault();openQuestion(questionLink.dataset.question);return}
    const close=event.target.closest('.modal-close');if(close){closeModal(close.closest('.modal-backdrop'));return}
    if(event.target.classList.contains('modal-backdrop')){closeModal(event.target);return}
    if(event.target.closest('.theme-toggle,.mobile-theme')){toggleTheme();return}
    const navLink=event.target.closest('.nav-link');if(navLink){$$('.nav-link').forEach(item=>item.classList.toggle('active',item===navLink))}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){$$('.modal-backdrop:not([hidden])').forEach(closeModal);return}if((event.key==='Enter'||event.key===' ')&&event.target.matches('.question-card,.trend-item')){event.preventDefault();openQuestion(event.target.dataset.question)}});
  $$('.question-tab').forEach(button=>button.addEventListener('click',()=>setTab(button.dataset.tab)));
  $('#askTitle').addEventListener('input',updateCounters);$('#askBody').addEventListener('input',updateCounters);
  $('#askForm').addEventListener('submit',event=>{
    event.preventDefault();
    const category=$('#askCategory').value,title=normalizeInput($('#askTitle').value),body=normalizeInput($('#askBody').value);
    if(!category||!title||!body){setError('يرجى اختيار القسم وكتابة عنوان السؤال وتفاصيله.');return}
    if(!validCategoryIds.has(category)){setError('القسم المحدد غير صالح.');return}
    if(title.length<8||title.length>110){setError('يجب أن يكون العنوان بين 8 و110 أحرف.');return}
    if(body.length<12||body.length>900){setError('يجب أن تكون التفاصيل بين 12 و900 حرف.');return}
    if(questions.length>=110){setError('وصل الموقع إلى حد الأسئلة المحلية. احذف البيانات القديمة أو اربط الموقع بخادم.');return}
    if(privacyPattern.test(`${title} ${body}`)){setError('يبدو أن النص يحتوي على بريد إلكتروني أو رقم هاتف. احذف بيانات التواصل الشخصية قبل الإرسال.');return}
    if(dangerousSchemePattern.test(`${title} ${body}`)||/<\/?[a-z][\s\S]*?>/i.test(`${title} ${body}`)){setError('أزل الروابط النشطة أو وسوم HTML واكتب السؤال كنص عادي.');return}
    const verdict=[Sec.inspect(title,questions.map(q=>q.title)),Sec.inspect(body)].find(v=>!v.ok);if(verdict){setError(verdict.reason);return}
    const rl=Sec.rate('question');if(!rl.ok){setError(`انتظر ${rl.wait} ثانية قبل إرسال سؤال آخر.`);return}
    const newQuestion={id:`u${Date.now()}${Math.random().toString(36).slice(2,6)}`,category,title,body,answer:'',author:'عضو جديد',initial:'ج',avatar:'',date:'الآن',views:0,likes:0,dislikes:0,featured:false,tags:[],sources:[],communityAnswers:[],status:'pending',createdAt:new Date().toISOString()};
    questions.unshift(newQuestion);save();renderCategories();setTab('new');$('#askForm').reset();updateCounters();setError('');closeModal($('#askModal'));showToast('تم حفظ السؤال محليًا — لم تتم مراجعته أو نشره على خادم.');$('#questions').scrollIntoView({behavior:'smooth'});openQuestion(newQuestion.id);
  });
  document.addEventListener('submit',event=>{
    const form=event.target.closest('[data-answer-form]');if(!form)return;event.preventDefault();
    const question=questions.find(item=>item.id===form.dataset.answerForm),field=form.querySelector('textarea'),answer=normalizeInput(field.value);
    if(!question)return;if(!answer){showToast('اكتب إجابتك أولًا');field.focus();return}
    if(answer.length<8||answer.length>900){showToast('يجب أن تكون الإجابة بين 8 و900 حرف');return}
    if(privacyPattern.test(answer)){showToast('احذف بيانات التواصل الشخصية قبل الإرسال');return}
    if(dangerousSchemePattern.test(answer)||/<\/?[a-z][\s\S]*?>/i.test(answer)){showToast('أزل الروابط النشطة أو وسوم HTML واكتب الإجابة كنص عادي');return}
    const verdict=Sec.inspect(answer,(question.communityAnswers||[]).map(a=>a.text).concat(question.answer||''));if(!verdict.ok){showToast(verdict.reason);return}
    const rl=Sec.rate('answer');if(!rl.ok){showToast(`وصلت إلى الحد المؤقت للمساهمات؛ حاول بعد ${rl.wait} ثانية`);return}
    question.communityAnswers=Array.isArray(question.communityAnswers)?question.communityAnswers:[];
    if(question.communityAnswers.length>=10){showToast('وصل هذا السؤال إلى الحد المحلي للمساهمات');return}
    question.communityAnswers.push({text:answer,date:'الآن'});question.answerAdded=true;question.date='تم تحديثه الآن';save();openQuestion(question.id,false);showToast('أُضيفت المساهمة، وستبقى موسومة بأنها غير متحققة');
  });

  function toggleTheme(){document.body.classList.toggle('dark');const isDark=document.body.classList.contains('dark');try{localStorage.setItem(THEME_KEY,isDark?'dark':'light')}catch{}document.querySelector('meta[name="theme-color"]').content=isDark?'#171916':'#f7f5f0';$$('.theme-toggle').forEach(button=>button.setAttribute('aria-label',isDark?'تفعيل الوضع النهاري':'تفعيل الوضع الليلي'))}
  if(safeRead(THEME_KEY,'light')==='dark')document.body.classList.add('dark');
  renderCategories();renderQuestions();updateCounters();
})();
