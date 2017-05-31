$(document).ready(function() {
	populateTopics();
	//populateStudents();
})

function populateTopics() {
	$.ajax({
		type: 'GET',
		url: "/teacher/gettopics/" + $('#classKey').val(),
		success: function (result) {
			renderTopics(result);
		}
	})
}

function populateStudents() {
	var postData = {
		classKey: $('#classKey').val()
	}
	$.ajax({
		type: 'POST',
		url: "/teacher/ajax/getStudentsInClass/",
		data: postData,
		success: function (result) {
			renderStudents(result);
		}
	})
}

function addTopic() {
	var postData = {
		topicName: $('#topicName').val(),
		classKey: $('#classKey').val(),
		classId: $('#classId').val()
	}
	$.ajax({
		type: 'POST',
		url: '/teacher/addtopic/',
		data: postData,
		success: function(result) {
			renderTopics($.parseJSON(result));
			$('#myModal').modal('toggle');
			$('.modal-backdrop').hide();
		}
	})
}

function renderTopics(topicArray) {
	for (var i = 0; i < topicArray.length; i++) {	
		var d = document;
		var link = $("<div class='topic-link'></div>")
			.data("topicNumber", topicArray[i].pk);
		var name = $("<span></span>").text(topicArray[i].fields.topic_name);
		var downArrow = $("<i onclick='toggleQuestionsInTopic(this)' class='fa fa-chevron-down'> </i>");
		var plusIcon = $("<i onclick='goToBuilder(this)' class='fa fa-plus-square-o'> </i>");
		var editIcon = $("<i onclick='openEditTopicModal(this)' class='fa fa-edit'> </i>");
		var deleteIcon = $("<i onclick='openConfirmDeleteTopicModal(this)' class='fa fa-trash-o'> </i>");
		
		var questionContainer = $("<div class='question-container'></div>")

		link.append(deleteIcon, name, editIcon, plusIcon, downArrow);
		$('.question-panel').append(link);
		$('.question-panel').append(questionContainer);
	}
}

function goToBuilder(icon) {
	var classId = $('#classId').val();
	console.log(classId);
	var topicId = $(icon).closest('.topic-link').data().topicNumber;
	console.log(topicId);
	window.location = '/builder/' + classId + '/' + topicId;
}

var questionBuilderModal = {
	topic: '',
	open: function(topic) {
		this.topic = $(topic).closest('.topic-link').data().topicNumber;
		$('#questionBuilder').modal();
	},
	submit: function() {
		postData = {
			topic: questionBuilderModal.topic,
			title: $('#qbName').val(),
		}
		$.ajax({
			type: 'POST',
			url: '/teacher/createQuestion/',
			data: postData,
			success: function(result) {
				$('#questionBuilder').modal('toggle');
				$('.modal-backdrop').hide();
			}
		})
	}
}

function openEditTopicModal(editIcon) {
	var container = editIcon.closest('.topic-link');
	$('#editTopicModalTopicName').val($(container).find('span').text());
	console.log( $(container).data().topicNumber );
	$('#hiddenTopicId').val($(container).data().topicNumber);
	$('#editTopicModal').modal();
}

function postEditTopic() {
	postData = {
		topicId: $('#hiddenTopicId').val(),
		topicName: $('#editTopicModalTopicName').val()
	}
	$.ajax({
		type: 'POST',
		url: '/teacher/ajax/editTopic/',
		data: postData,
		success: function(result) {
			$('#editTopicModal').modal('toggle');
			$('.modal-backdrop').hide();
		}
	})	
}

function openConfirmDeleteTopicModal(deleteIcon) {
	var topicContainer = $(deleteIcon).closest('.topic-link');
	var topicId = topicContainer.data().topicNumber;
	$('#hiddenTopicId').val(topicId);
	$('#deleteConfirmModal').modal();
}

function confirmDeleteTopic() {
	if ($('.confirm-txt').val() == 'YES') {
		var postData = {
			topicId: $('.hidden-delete-key').val()
		}
		$.ajax({
			type: 'POST',
			url: '/teacher/ajax/deleteTopic/',
			data: postData,
			success: function(result) {
				alert('unbelievable');
			}
		})
	}
}

function toggleQuestionsInTopic(arrowIcon) {
	
	var topicContainer = $(arrowIcon).closest('.topic-link');
	var questionContainer = topicContainer.next();

	if ($(arrowIcon).hasClass('fa-chevron-down') && questionContainer.children().length == 0) {

		$(arrowIcon).removeClass('fa-chevron-down').addClass('fa-spinner').addClass('fa-spin');

		postData = {
			topicId: topicContainer.data().topicNumber
		}
		$.ajax({
			type: 'POST',
			url: '/teacher/ajax/getQuestionsInTopic/',
			data: postData,
			success: function(result) {

				for (var i = 0; i < result.length; i++ ) {

					var questionRow = $("<div class='question-row'></div>")
						.data("questionId", result[i].pk);
					var questionName = $("<span></span>")
						.text(result[i].fields.question_title);
					var goIcon = $("<i class='fa fa-plus' onclick='openAddKeywordModal(this)' />");
					var deleteIcon = $("<i class='fa fa-trash-o' onclick='deleteQuestion(this)' />");

					questionRow.append(questionName, deleteIcon, goIcon);
					questionContainer.append(questionRow);

				}

				if (result.length == 0) {

					var emptyMessage = $("<div class='empty-message'>There are no questions to display...</div>");
					questionContainer.append(emptyMessage);

				}

				$(arrowIcon).removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-chevron-up');

			}
		})

	} else if ($(arrowIcon).hasClass('fa-chevron-up')) {

		questionContainer.hide();
		$(arrowIcon).removeClass('fa-chevron-up').addClass('fa-chevron-down');

	} else {

		questionContainer.show();
		$(arrowIcon).removeClass('fa-chevron-down').addClass('fa-chevron-up');

	}
}

function deleteQuestion(icon) {
	console.log($(icon).closest('div.question-row').data().questionId)
	postData = {
		questionId: $(icon).closest('div.question-row').data().questionId
	}
	$.ajax({
		type: 'POST',
		url: '/teacher/ajax/deleteQuestion/',
		data: postData,
		success: function(result) {
			alert("deleted");
		}
	})
}

function openAddKeywordModal(icon) {
	var questionId = $(icon).closest('div.question-row').data().questionId;
	$('#hiddenQuestionId').val(questionId);

	$('#keywordString').val('');
	$('#keywordValue').val('');

	$('#addKeywordModal').modal();
}

function addKeyword() {
	postData = {
			questionId: $('#hiddenQuestionId').val(),
			keyword: $('#keywordString').val(),
			points: +$('#keywordValue').val()
		}
		$.ajax({
			type: 'POST',
			url: '/teacher/ajax/addKeyword/',
			data: postData,
			success: function(result) {
				$('#addKeywordModal').modal('toggle');
			}
		})
}