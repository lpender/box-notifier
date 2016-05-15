var itemList = document.getElementById('item-list');
var myAudio = new Audio();
myAudio.src = "https://s3.amazonaws.com/box-notification/new_file.mp3";

function startPlaying() {
  myAudio.play();

  var audioInterval = setInterval(function() {
    myAudio.play();
  }, 3000);

  document.body.addEventListener('click', function () {
    clearInterval(audioInterval);
  });
}

observer = new MutationObserver(function(records){
  console.log(records);

  records.forEach(function(record){
    var $el = $(record.target.parentElement);

    if ($el.hasClass('item_link') && record.type == "characterData") {
      console.log("Box Notifier: Item updated");
      startPlaying();
    } else if (record.addedNodes.length && record.addedNodes[0].tagName == "LI") {
      console.log("Box Notifier: Item created");
      startPlaying();
    }
  });
});

observer.observe(itemList, { childList: true, subtree: true, characterData: true });

// Testing Simulations
var listItem = itemList && itemList.childNodes[5];

function simulateAdd () {
  var clone = listItem.cloneNode(true);
  itemList.appendChild(clone);
}

function simulateChange () {
  var itemName = listItem.getElementsByClassName('item_link')[0];
  itemName.innerHTML = itemName.innerHTML + "_LP";
}
