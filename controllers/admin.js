const Domain = require('../models/domain');
const Area = require('../models/area');

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
        isAdmin: req.session.isAdmin
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
        isAdmin: req.session.isAdmin
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