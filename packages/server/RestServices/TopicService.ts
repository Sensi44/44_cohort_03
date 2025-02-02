import BaseRESTService from './BaseRESTService';

import Topic from '../Models/Topic';
import type {
  ICreateTopicRequest,
  IFindTopicRequest,
} from './Types/TopicService.types';

class TopicService implements BaseRESTService {
  public find = async ({ id, title }: IFindTopicRequest) => {
    if (id) {
      return await Topic.findByPk(id);
    }

    return Topic.findOne({
      where: {
        title: `%${title}%`,
      },
    });
  };

  public create = async (data: ICreateTopicRequest) => {
    return await Topic.create(data);
  };

  public getAll = async () => {
    return await Topic.findAll();
  };
}

export default new TopicService();
