observer = new MutationObserver(function(records){
  console.log(records);

  records.forEach(function(record){
    var $el = $(record.target.parentElement);

    if ($el.hasClass('item_link') && record.type == "characterData") {
      alert('update');
    } else if (record.addedNodes.length) {
      alert('added');
    }
  });
});

var itemList = document.getElementById('item-list');
observer.observe(itemList, { childList: true, subtree: true, characterData: true })

var listItem = itemList.childNodes[5];

function simulateAdd () {
  var clone = listItem.cloneNode(true);
  itemList.appendChild(clone);
}

function simulateChange () {
  var itemName = listItem.getElementsByClassName('item_link')[0];
  itemName.innerHTML = itemName.innerHTML + "_LP";
}
