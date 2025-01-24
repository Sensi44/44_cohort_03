interface FindTopicRequest {
  id?: number;
  title?: string;
}

interface CreateTopicRequest {
  title: string;
}

import BaseRESTService from './BaseRESTService';

import Topic from '../Models/Topic';

class TopicService implements BaseRESTService {
  public find = async ({ id, title }: FindTopicRequest) => {
    if (id) {
      return await Topic.findByPk(id);
    }

    return Topic.findOne({
      where: {
        title: `%${title}%`,
      },
    });
  };

  public create = async (data: CreateTopicRequest) => {
    return await Topic.create(data);
  };
}

export default new TopicService();
