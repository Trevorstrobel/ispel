const Domain = require('../models/domain');
const Area = require('../models/area');
const User = require('../models/user');

exports.getAddDomain = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
      }
    res.render('add-domain', {
        pageTitle: 'Add Domain',
        path: '/admin/add-domain',
        formsCSS: true,
        productCSS: true,
        activeAddTopic: true,
        isAuthenticated: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        errors: null
    })
}

exports.postAddDomain = (req, res, next) => {
    const name = req.body.name;
    const shortName = req.body.shortName;
    Domain.create({
        name: name,
        shortName: shortName
    }).then(() =>{
        res.redirect('/admin/add-area');
    });
}


exports.getAddArea = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
      }
    Domain.findAll().then((domains) =>{
    res.render('add-area', {
        pageTitle: 'Add Area',
        path: '/admin/add-area',
        domains: domains,
        formsCSS: true,
        productCSS: true,
        activeAddTopic: true,
        isAuthenticated: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        errors: null
    })})
}

exports.postAddArea = (req, res, next) => {
    const domainId = req.body.domainId;
    const name = req.body.name;
    const shortName = req.body.shortName;
    Area.create({
        name: name,
        shortName: shortName,
        domainId: domainId
    }).then(() =>{
        res.redirect('/admin/add-area');
    })
}

exports.getAssignUser = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
      }
    User.findAll().then(users =>{
        Domain.findAll().then(domains =>{
            res.render('assign-user', {
                pageTitle: 'Assign User',
                path: '/admin/assign-user',
                activeAddTopic: true,
                isAuthenticated: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin,
                errors: null,
                users: users,
                domains: domains
            })
        })
    }).catch(err => console.log(err));
  
}

exports.postAssignUser = (req, res, next) => {
    const userId = req.body.userId;
    const domainIds = req.body.domainIds;

    User.findOne({where:{id: userId}}).then(user =>{
        Domain.findAll({where:{id: domainIds}}).then(domains =>{
            user.setDomains(domains);
            res.redirect('/admin/add-area');
        })
    }).catch(err => console.log(err));
}