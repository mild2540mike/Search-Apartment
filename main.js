document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {

  Swal.fire({
    title: 'Custom width, padding, background.',
    width: 500,
    hight: 200,
    padding: '7em',
    background: '#fff url(./images/tenor-2.gif)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("./images/tenor-backdrop.gif")
      left top
      no-repeat
    `
  })
  
  var name = document.getElementById("nameInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueId = chance.guid();
  var issueStatus = "Open";
  var issuetest = makeid(5);
  var isDate = Date();
  var issueDate = isDate.split(" ").slice(1, 5).join(" ");

  var issue = {
    id: issueId,
    room: name,
    location: issueSeverity,
    price: issueAssignedTo,
    status: issueStatus,
    testTo: issuetest,
    CreateDate: issueDate,
  };
  // console.log(issue)

  if (localStorage.getItem("issues") == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

if(issues){
  Swal.fire("Success Message", "Closed", "success");
}

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
if(issues) {
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    localStorage.setItem("issues", JSON.stringify(issues));

    fetchIssues();
  }
})

}
  
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].room;
    var location = issues[i].location;
    var price = issues[i].price;
    var status = issues[i].status == "Open"? '<span class="label label-info">Open</span>': '<span class="label label-default">Closed</span>';
    var testTo = issues[i].testTo;
    var CreateDate = issues[i].CreateDate;

    issuesList.innerHTML +=
      '<div class="well">' +
      "<h6>Schedule ID: " + id + "</h6>" +
      "<p>" + status + "</p>" +
      "<h3>" + desc + "</h3>" +
      '<p><span class="glyphicon glyphicon-map-marker"></span> ' + location + "km ," + CreateDate + "</p>" + 
      '<p>' + price + ' (bath/month)' + "</p>" +
      '<p><span class="glyphicon glyphicon-qrcode"></span> ' + testTo + "</p>" +
      '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
      '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
      "</div>";
  }
}

function validate() {
    Swal.fire("Error Message", "Please check pattern input: 0.0 (km)", "error");
  };


  //##################################### Jquery Dependency ################################
  //########################################################################################
  //########################################################################################

$("input[data-type='currency']").on({
  keyup: function() {
    formatCurrency($(this));
  },
  blur: function() { 
    formatCurrency($(this), "blur");
  }
});
function formatNumber(n) {

return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {

var input_val = input.val();

if (input_val === "") { return; }

var original_len = input_val.length;

var caret_pos = input.prop("selectionStart");

if (input_val.indexOf(".") >= 0) {

  var decimal_pos = input_val.indexOf(".");

  var left_side = input_val.substring(0, decimal_pos);
  var right_side = input_val.substring(decimal_pos);

  left_side = formatNumber(left_side);

  right_side = formatNumber(right_side);

  if (blur === "blur") {
    right_side += "00";
  }
  
  right_side = right_side.substring(0, 2);

  input_val = "$" + left_side + "." + right_side;

} else {
  input_val = formatNumber(input_val);
  input_val = "$" + input_val;
  
  if (blur === "blur") {
    input_val += ".00";
  }
}

input.val(input_val);

var updated_len = input_val.length;
caret_pos = updated_len - original_len + caret_pos;
input[0].setSelectionRange(caret_pos, caret_pos);
}

  //##################################### END Jquery Dependency ############################
  //########################################################################################
  //########################################################################################
