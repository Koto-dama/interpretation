using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react_pdf_int.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentUploadController : ControllerBase
    {
        // GET: api/<DocumentUploadController>
        [HttpGet]
        public IEnumerable<InterpretedDocument> Get()
        {
            //return a new array of interpretedDocument objects
            return new InterpretedDocument[]
            {
                new InterpretedDocument
                {
                    DocumentName = "Document 1",
                    DocumentType = "PDF",
                    DocumentContent = "This is a PDF document",
                    DocumentStatus = "Uploaded"
                },
                new InterpretedDocument
                {
                    DocumentName = "Document 2",
                    DocumentType = "DOCX",
                    DocumentContent = "This is a DOCX document",
                    DocumentStatus = "Uploaded"
                }
            };
        }

        // GET api/<DocumentUploadController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // POST api/<DocumentUploadController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IFormFile document)
        {
            if (document == null || document.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (document.ContentType != "application/pdf")
            {
                return BadRequest("Invalid file type. Please upload a PDF file.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

            // Ensure the upload folder exists
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var filePath = Path.Combine(uploadsFolder, document.FileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await document.CopyToAsync(stream);
                }

                return Ok(new { Message = "File uploaded successfully.", FileName = document.FileName });
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading the file.");
            }
        }

        // PUT api/<DocumentUploadController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DocumentUploadController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
