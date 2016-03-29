tatamiJHipsterApp
    .controller('ProfileController', ['$scope', '$state', '$translate', 'Upload', 'userLogin', 'AccountService', 'ngToast',
    function($scope, $state, $translate, Upload, userLogin, AccountService, ngToast) {

//        // Current state of the view
        $scope.current = {
            avatar: []
        };
//
//        Status of the current upload
          $scope.uploadStatus = {
              isUploading: false,
              progress: 0
          };
//
//        // Resolve the user data, profileInfo is inherited from account state
//        // Since profileInfo is a resolve from the parent state, updating the model will cause
//        // the first and last name in the side bar and text area to sync. Is this undesired?


        $scope.userProfile = userLogin;


        // Update the user information
        $scope.updateUser = function() {
            AccountService.update($scope.userProfile, function() {
                ngToast.create({
                    content: $translate.instant('account.profile.save')
                });
            }, function() {
                ngToast.create({
                    content: $translate.instant('form.fail'),
                    class: 'danger'
                });
            });
        };

            // upload on file select or drop
            $scope.upload = function (file) {
                $scope.uploadStatus.isUploading = true;
                Upload.upload({
                    url: '/tatami/rest/fileupload/avatar',
                    data: {uploadFile: file},
                    fileFormDataName: 'uploadFile'
                }).then(function (data) {
                    $scope.uploadStatus.isUploading = false;
                    $scope.uploadStatus.progress = 0;
                    $scope.$state.reload();
                }, function (resp) {
                    $scope.uploadStatus.isUploading = false;
                    $scope.uploadStatus.progress = 0;
                }, function (evt) {
                    $scope.uploadStatus.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
            };
            // for multiple files:
            $scope.uploadFiles = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        $scope.uploadStatus.isUploading = true;
                        Upload.upload({
                            url: '/tatami/rest/fileupload/avatar',
                            data: { uploadFile: files[i] },
                        }).then(function (data) {
                            $scope.current.attachments.push(data.data[0]);
                            $scope.uploadStatus.isUploading = false;
                            $scope.uploadStatus.progress = 0;
                            $scope.status.attachmentIds.push(data.data[0].attachmentId);
                        }, function (resp) {
                            $scope.uploadStatus.isUploading = false;
                            $scope.uploadStatus.progress = 0;
                        }, function (evt) {
                            $scope.uploadStatus.progress = parseInt(100.0 * evt.loaded / evt.total);
                        });
                    }
                }
            }
       }
]);
