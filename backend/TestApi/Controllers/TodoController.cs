using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TestApi.Models;
using System.Linq;
using System;

namespace TestApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TodoController : ControllerBase
    {
        private static readonly List<TodoItem> _dataList = new();

        [HttpGet]
        public IEnumerable<TodoItem> Get(bool? hideCompleted)
        {
            if (hideCompleted == true)
            {
                return _dataList.Where(o => o.Status != TodoStatus.Completed);
            }

            return _dataList;
        }


        [HttpPost]
        public IEnumerable<TodoItem> Create([FromQuery] bool? hideCompleted, [FromBody] TodoItem model)
        {
            model.Id = Guid.NewGuid();
            model.Date = DateTime.UtcNow;
            model.Status = TodoStatus.New;

            _dataList.Add(model);

            return Get(hideCompleted);
        }

        [HttpPost]
        public IEnumerable<TodoItem> Complete([FromQuery] bool? hideCompleted, [FromBody] TodoItem model)
        {

            var item = _dataList.SingleOrDefault(o => o.Id == model.Id);

            if (item != null)
            {
                item.Status = TodoStatus.Completed;
            }

            return Get(hideCompleted);
        }

        [HttpPost]
        public IEnumerable<TodoItem> Delete([FromQuery] bool? hideCompleted, [FromBody] TodoItem model)
        {

            var item = _dataList.SingleOrDefault(o => o.Id == model.Id);

            if (item != null)
            {
                _dataList.Remove(item);
            }

            return Get(hideCompleted);
        }
    }
}
