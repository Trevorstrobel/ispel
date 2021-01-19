const Domain = require('../models/domain');
const Area = require('../models/area');

exports.getAddDomain = (req, res, next) => {
    res.render('add-domain', {
        pageTitle: 'Add Domain',
        path: '/admin/add-domain',
        formsCSS: true,
        productCSS: true,
        activeAddTopic: true
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
    Domain.findAll().then((domains) =>{
    res.render('add-area', {
        pageTitle: 'Add Area',
        path: '/admin/add-area',
        domains: domains,
        formsCSS: true,
        productCSS: true,
        activeAddTopic: true
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