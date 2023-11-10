# Activity Management Server

## How to Install

1. Run the following command to initialize migrations:

    ```
    ./init_makemigrations.sh
    ```

    If you encounter an error, run the following command and try again:

    ```
    chmod +x init_makemigrations.sh
    ```

2. Open each app's models and uncomment fields under the comment "Uncomment after initial migration."

3. Run the following command to finalize migrations:

    ```
    ./final_makemigrations.sh
    ```

    If you encounter an error, run the following command and try again:

    ```
    chmod +x final_makemigrations.sh
    ```

## How to Run

Run the following command to start the server on localhost at port 8001:

```
python manage.py runserver localhost:8001
```