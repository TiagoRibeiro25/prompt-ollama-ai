# Instructions

1. Install NVIDIA Container Toolkit

    Arch Linux

    ```bash
    yay -S nvidia-container-toolkit
    ```

    Debian / Ubuntu

    ```bash
    sudo apt-get install -y nvidia-container-toolkit
    ```

2. Run the container

    ```bash
    docker run -d --gpus=all -v $(pwd)/ollama-volume:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
    ```

3. Run the model

    ```bash
    docker exec -it ollama ollama run llama3
    ```
