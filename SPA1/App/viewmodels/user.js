define(['services/logger'], function (logger) {
    var userList = ko.observableArray([]);
    var title = 'User Listing and Details'
    var vm = {
        activate: activate,
        title: title,
        userList: userList,
        fnAddNewUser: fnAddNewUser,
        fnUserEdit: fnUserEdit,
        fnUserSave: fnUserSave,
        fnUserCancel: fnUserCancel
    };

    return vm;

    //#region Internal Methods
    function activate() {
        fnLoadUsers();
        logger.log('User View Activated', null, 'user', true);
        return true;
    }
    function fnLoadUsers() {
        //ajax call
        $.ajax({
            type: "GET",
            async: false,
            url: "api/User/GetUsers",
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        }).done(function (data) {
            userList.removeAll();
            $.each(data, function (index, value) {
                userList.push(new userModel(value));
            })
        }).fail(function (request, error) {
            logger.logError(error, request, "", true);
        });

    };
    function fnAddNewUser() {
        var newUser = new userModel("");
        newUser.edit(true);
        userList.push(newUser);
    };
    function fnUserEdit() {
        this.edit(true);
    };
    function fnUserSave() {
        var _user = this;
        $.ajax({
            type: "POST",
            async: true,
            url: "api/User/PostUser",
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(this)

        }).done(function (data) {
            _user.originalData = JSON.parse(ko.toJSON(_user));
            _user.edit(false);

            //this.edit(true);
            logger.log('User Details Saved', null, title, true);

        }).fail(function (request, error) {
            logger.logError(error, request, "", true);
        });
    };
    function fnUserCancel(object) {
        old_object = new userModel(object.originalData);
        
        var tileIndex = -1;
        $.each(userList(), function (key, value) {
            if (value.Id == object.Id) {
                tileIndex = key;
                return;
            }
        });

        userList.splice(tileIndex, 1, old_object);
    };
    function userList(object) {
        object = new userModel(object.originalData);
        userList.remove(object);
    };
    function userModel(data) {
        var self = this;
        self.Id = (data.Id != undefined) ? data.Id : 0;
        self.First = (data.First != undefined) ? data.First : 0; //data.First;
        self.Last = (data.Last != undefined) ? data.Last : 0; //data.Last;
        self.DOB = (data.DOB != undefined) ? data.DOB : 0; //data.DOB;
        self.Sex = (data.Sex != undefined) ? data.Sex : 0; //data.Sex;
        self.Others = (data.Others != undefined) ? data.Others : 0; //data.Others;
        self.edit = ko.observable(false);
        self.originalData = data;
    };
    //#endregion
});