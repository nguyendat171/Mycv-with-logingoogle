/**
 * Created by Nguyen_Dat on 24/04/2016.
 */
var app = angular.module("MyCV", ["xeditable","firebase"]);
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});
// lam vay met nha, m kogom dât ve 1 cho
//https://mycv-dat.firebaseio.com
app.controller('Controller', function($scope, $http,$firebaseObject, $firebaseAuth) {
    $scope.visiblesummary=false;
    $scope.visibleexperience=false;
    $scope.visibleproject=false;
    $scope.visibleskill=false;
    $scope.visibleeducation=false;
    $scope.data=[];
    var ref = new Firebase("https://dat-cv-app.firebaseio.com");
    $scope.data = $firebaseObject(ref);
    $scope.authObj=$firebaseAuth(ref);

    $scope.Login=function()
    {

        $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $scope.login=true;
        }).then(function() {
            // Never called because of page redirect
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });

    };


    $scope.Logout=function()
    {
        $scope.authObj.$unauth();
        $scope.authObj.$onAuth(function(authData) {
            if (authData) {
                console.log("Authenticated with uid:", authData.uid);
            } else {
                console.log("Client unauthenticated.")
                $scope.login=false;
            }
        });

    };
    $scope.AddSummary=function()
    {
        $scope.data.summary.push({summary:$scope.summary});
        $scope.visiblesummary=false;
        $scope.summary="";
    };
    $scope.AddExperience=function()
    {
        $scope.data.experience.push({experience:$scope.experience});
        $scope.visibleexperience=false;
        $scope.experience="";
    };
    $scope.AddProject=function()
    {
        $scope.data.project.push({project:$scope.project});
        $scope.visibleproject=false;
        $scope.project="";
    };
    $scope.AddLanguage=function()
    {
        $scope.data.language.push({language:$scope.language});
        $scope.visiblelanguage=false;
        $scope.language="";
    };
    $scope.AddSkill=function()
    {
        $scope.data.skill.push({skill:$scope.skill});
        $scope.visibleskill=false;
        $scope.skill="";
    };
    $scope.AddEducation=function()
    {
        $scope.data.education.push({education:$scope.education});
        $scope.visibleeducation=false;
        $scope.education="";
    };


});
