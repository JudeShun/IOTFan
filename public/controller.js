var brokerName = "wss://test.mosquitto.org:8081/mqtt";
var topic = "joey/device/status";
var payload = "Device Turned On: ";


//for connecting
$('#btn-connect').click(function () {
  $("#status").text('Connecting...');
  console.log("connected successfully!");
  client = mqtt.connect(brokerName)
  client.on("connect", function () {
    $("#status").text('Device is ON!');


    client.on("message", function (topic, payload) {
      var tr = $("<tr>")
      var timestamp = moment().format('MMMM D YYYY , h:mm:ss a')
      $("<td>").text(topic).appendTo($(tr))
      $("<td>").text(payload).appendTo($(tr))
      $("<td>").text(timestamp).appendTo($(tr))
      $("tbody").append($(tr))
    })
  })

  //for publishing
  $("#btn-publish").click(function () {
    client.publish(topic, payload)
  })
  //for Subscribing
  $('#btn-connect').click(function (e) {
    client.subscribe(topic)
    $("#substatus").text('Subscribed Successfully!');
  })
  //for unsubscribing
  $('#btn-unsubscribe').click(function (e) {
    client.unsubscribe($("#topic").val())
    $("#substatus").text('You have Unsubscribed!');
  })
  //for disconnecting
  $('#btn-disconnect').click(function (e) {
    client.end()
    $("#status").text("You have been Turned OFF!");
  })


})































