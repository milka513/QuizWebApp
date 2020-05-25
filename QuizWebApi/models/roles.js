const AccesControl=require('accesscontrol')
const ac=new AccesControl();

exports.roles=(function() {
    ac.grant('admin')
    .updateAny('question')
    .deleteAny('question')
    .readAny('question')
    .readAny('scores')
    .updateAny('scores')

    ac.grant('user')
    .readAny('scores')

    return ac;
})();