/**
 *
 * The StatusService is used to create new statuses, and edit existing statuses.
 */

TatamiApp.factory('StatusService', [ '$resource', function($resource){
    return $resource('/tatami/rest/statuses/:statusId');
}]);