$(document).ready(function () {
      // Init
      $('.image-section').hide();
      $('.loader').hide();
      $('#result').hide();
  
      // Upload Preview
      function readURL(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                  $('#imagePreview').hide();
                  $('#imagePreview').fadeIn(650);
              }
              reader.readAsDataURL(input.files[0]);
          }
      }
      $("#imageUpload").change(function () {
          $('.image-section').show();
          $('#btn-predict').show();
          $('#result').text('');
          $('#result').hide();
          $('#accuracy').text('');
          $('#accuracy').hide();
          readURL(this);
      });
  
      // Predict
      $('#btn-predict').click(function () {
          var form_data = new FormData($('#upload-file')[0]);
  
          let neem = "Neem, revered in traditional medicine for centuries, boasts a plethora of medicinal properties. Its potent antiviral and antibacterial nature makes it a go-to remedy for combating skin conditions such as acne, eczema, and psoriasis. Neem's anti-inflammatory properties provide relief from joint pain and arthritis, while its antipyretic action aids in reducing fever. Additionally, neem is utilized in the treatment of gastrointestinal issues, including ulcers and diarrhea, thanks to its ability to soothe the digestive tract. Its antifungal properties make it effective against fungal infections such as athlete's foot and nail fungus. Moreover, neem's immunomodulatory effects enhance the body's defense mechanisms, promoting overall health and well-being.", 
          oleander = "Oleander, though acknowledged for its extreme toxicity, harbors potential medicinal properties that have intrigued researchers. Despite its dangers, compounds within oleander have been studied for their potential anticancer properties, showing promise in inhibiting tumor growth and inducing apoptosis in cancer cells. Additionally, oleander extracts have demonstrated cardiovascular benefits, including potential use in managing heart failure and arrhythmias. Furthermore, oleander has been explored for its antimicrobial properties, suggesting potential applications in combating bacterial and fungal infections. However, caution must be exercised in utilizing oleander medicinally due to its high toxicity levels, requiring strict dosage control and medical supervision.", 
          jackfruit = "Jackfruit, celebrated not only for its delicious taste but also for its medicinal properties, offers a bounty of health benefits. Rich in antioxidants, vitamins, and minerals, jackfruit aids in boosting the immune system and promoting overall well-being. Its high fiber content supports digestive health by preventing constipation and promoting regular bowel movements. Jackfruit is also renowned for its ability to regulate blood sugar levels, making it beneficial for individuals with diabetes. Additionally, its anti-inflammatory properties help alleviate symptoms of inflammation-related conditions such as arthritis and asthma. Furthermore, jackfruit consumption is associated with improved skin health, thanks to its vitamin C content, which aids in collagen production and skin repair. Overall, jackfruit stands as a versatile and nutritious fruit with a wide array of medicinal properties.", 
          indiaMustard = "Indian mustard, esteemed for both its culinary and medicinal uses, harbors a plethora of health benefits. Rich in nutrients and phytochemicals, Indian mustard possesses potent anti-inflammatory and antimicrobial properties, making it a valuable remedy for various ailments. Its anti-inflammatory effects are particularly beneficial for alleviating pain associated with conditions like arthritis and muscle soreness. Indian mustard is also renowned for its ability to support respiratory health, providing relief from respiratory issues such as coughs, colds, and bronchitis. Additionally, its antimicrobial properties help combat infections and promote overall immune function. Moreover, Indian mustard is rich in antioxidants, which play a crucial role in neutralizing harmful free radicals and reducing the risk of chronic diseases. Whether consumed as a spice or as a medicinal remedy, Indian mustard stands as a versatile plant with numerous health-promoting properties.", 
          peepal = "Peepal, revered in various traditional medicinal practices, boasts a diverse range of health benefits. Known for its antimicrobial, antifungal, and anti-inflammatory properties, peepal is utilized to treat a myriad of ailments. Its antimicrobial nature makes it effective in combating bacterial and fungal infections, while its anti-inflammatory properties offer relief from inflammatory conditions such as arthritis and gastritis. Peepal is also valued for its ability to aid digestion and alleviate gastrointestinal discomfort. Furthermore, it is believed to possess detoxifying properties, purifying the blood and promoting overall health and well-being. In addition, peepal leaves are often used topically to treat skin conditions such as wounds, cuts, and infections due to their antiseptic qualities. Overall, peepal stands as a revered plant in traditional medicine, offering a holistic approach to healing and wellness.", 
          castor = "Castor, known for its multifaceted medicinal properties, has been utilized for centuries in various traditional healing systems. Primarily recognized for its potent laxative effects, castor oil is commonly used to relieve constipation and promote regular bowel movements. Beyond its laxative properties, castor oil exhibits anti-inflammatory effects, making it valuable in the treatment of conditions such as arthritis, joint pain, and muscle soreness. Additionally, castor oil is utilized topically to address a range of skin issues, including dryness, acne, and dermatitis, thanks to its moisturizing and antimicrobial properties. Furthermore, castor oil is believed to stimulate circulation when applied externally, aiding in the healing of wounds and reducing inflammation. Whether ingested or applied topically, castor offers a versatile and effective approach to addressing various health concerns.";

          // Show loading animation
          $(this).hide();
          $('.loader').show();
  
          // Make prediction by calling api /predict
          $.ajax({
              type: 'POST',
              url: '/predict',
              data: form_data,
              contentType: false,
              cache: false,
              processData: false,
              async: true,
              success: function (data) {
                  // Get and display the result
                  $('.loader').hide();
                  $('#result').fadeIn(600);
                  $('#result').text(' Result:  ' + data[0]);
                  $('#accuracy').fadeIn(600);
                  $('#accuracy').text(' Accuracy:  ' + data[1] + "%");
                  $('#mp').fadeIn(600);
                  $('#mp').text(data[0] == "Castor" ? castor : data[0] == "Indian_Mustard" ? indiaMustard : data[0] == "Jackfruit" ? jackfruit : data[0] == "Peepal" ? peepal : data[0] == "Oleander" ? oleander :  neem);
                  console.log('Success!');
              },
          });
      });
  
  });