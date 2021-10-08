using System;

namespace TestApi.Models
{
    public class TodoItem
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }
        public string DateToDisplay { get { return Date.ToString("dd/MM/yyyy HH:mm"); } }

        public TodoStatus Status { get; set; }

        public string StatusText { get { return Status.ToString(); } }

    }



}
