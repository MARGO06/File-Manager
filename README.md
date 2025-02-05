# File-Manager

## Technical requirements:

- The program is started by npm-script start in following way:

`npm run start -- --username=your_username`

- After program work finished (_ctrl + c_ pressed or user sent _.exit_ command into console).

* Navigation & working directory (nwd):

  - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)

  `up`

  - Go to dedicated folder from current directory (path_to_directory can be relative or absolute)

  `cd path_to_directory`

  - Print in console list of all files and folders in current directory.

  `ls`

* Basic operations with files

  - Read file and print it's content in console (should be done using Readable stream):

  `cat path_to_file`

  - Create empty file in current working directory:

  `add new_file_name`

  - Create new directory in current working directory:

  `mkdir new_directory_name`

  - Rename file (content should remain unchanged):

  `rn path_to_file new_filename`

  - Copy file (should be done using Readable and Writable streams):

  `cp path_to_file path_to_new_directory`

  - Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams):

  `mv path_to_file path_to_new_directory`

  - Delete file:

  `rm path_to_file`

* Operating system info (prints following information in console)

  - Get EOL (default system End-Of-Line) and print it to console

  `os --EOL`

  - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console

  `os --cpus`

  - Get home directory and print it to console

  `os --homedir`

  - Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console

  `os --username`

  - Get CPU architecture for which Node.js binary has compiled and print it to console

  `os --architecture`

* Hash calculation

  - Calculate hash for file and print it into console

  `hash path_to_file`

* Compress and decompress operations

  - Compress file (using Brotli algorithm, should be done using Streams API)

  `compress path_to_file path_to_destination`

  - Decompress file (using Brotli algorithm, should be done using Streams API)

  `decompress path_to_file path_to_destination`

  NB! After decompressing of previously compressed file result should not differ with originally compressed file
