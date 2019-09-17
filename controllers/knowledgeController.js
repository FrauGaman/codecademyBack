import models from '../models/index';
import { likeData, organizeData, paginateData } from './scripts/queryParams';

export const knowledgeGet = function(request, response) {
  let options = {};
  let likeQuery = likeData(request.query, options);
  (likeQuery !== undefined) && (options = {...options, ...likeQuery});
  let sortQuery = organizeData(request.query._sort, request.query._order);
  (sortQuery !== undefined) && (options = {...options, ...sortQuery});
  let paginateQuery = paginateData(request.query._page, request.query._limit);
  (paginateQuery !== undefined) && (options = {...options, ...paginateQuery});
  models.Knowledge.findAll(options).then(knowledge => {
    response.send(knowledge);
  }).catch(err=>console.log(err));
};

export const knowledgeById = function (request, response) {
  models.Knowledge.findAll({
    where: { id: request.params.id }
  }).then(knowledge => {
    response.send(knowledge);
  }).catch(err=>console.log(err));
};

export const knowledgeCreate =  function (request, response) {
  if(!request.body) return response.sendStatus(400);
  const { name } = request.body;
  models.Knowledge.create({
    name: name
  }).then(() => {
    response.send({success: true});
  }).catch((err) => {
    console.log(err)
  })
};

export const knowledgeEdit = function (request, response) {
  if(!request.body) return response.sendStatus(400);
  models.Knowledge.update(
    {
      name: request.body.name
    },
    { where: { id: request.params.id } }
  ).then(() => {
    response.send({success: true});
  }).catch((err) => {
    console.log(err)
  })
};

export const knowledgeDelete = function(request, response) {
  models.Knowledge.destroy({
    where: { id: request.params.id }
  }).then(() => {
    response.send({success: true});
  }).catch((err) => {
    console.log(err)
  })
};


