# Contributing to Pokemon Personality Analysis

Thank you for your interest in contributing to my Pokemon Personality Analysis application! Since this is a solo project, I appreciate any contributions that can help improve the application.

## Ways to Contribute

If you want to contribute code:

#### Development Setup

```bash
# Clone repository
git clone <repository-url>
cd Dev5-MatteoGiambarresi

# Set up environment
cp .env.example .env
docker compose up --build
```

#### Coding Standards

- Follow existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all endpoints work with VITE_API_URL
- Test your changes

#### Frontend Guidelines

- Use Tailwind CSS for styling
- Follow React functional component patterns
- Use hooks appropriately
- Ensure responsive design
- Add error handling for API calls

#### Backend Guidelines

- Follow Express.js patterns
- Use proper error handling
- Validate input data
- Maintain existing repository pattern
- Add proper logging where needed

## Pull Request Process

1. **Fork Repository**

   - Click "Fork" button on GitHub to create your copy
   - This creates a separate repository under your GitHub account

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Dev5-MatteoGiambarresi.git
   cd Dev5-MatteoGiambarresi
   ```

3. **Add Upstream Remote** (to sync with my repository)

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/Dev5-MatteoGiambarresi.git
   ```

4. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Changes**

   - Write clean, documented code
   - Test thoroughly
   - Follow existing patterns

6. **Commit Changes using conventional commit messages**

   ```bash
   git add .
   git commit -m "feat: add descriptive commit message"
   ```

7. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Submit Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out PR template with:
     - Clear title describing changes
     - Detailed description of what you did
     - Include screenshots if UI changes
     - Reference any related issues

## Testing

Please follow the established coding style and conventions used in the project.
Be sure your code is well-documented and maintanable.

## Reporting Issues

If you encounter any issues with the project, please open a Github issue with a clear and descriptive title, 
including details about the problem and how to reproduce it.


## Code of Conduct
Please review and adhere to my [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful
and inclusive environment for all contributors.

## Licensing

By contributing, you agree that your contributions will be licensed under the same license as the project [MIT license](LICENSE).

---

Thank you for helping improve the Pokemon Personality Analysis application! Your contributions help create a better educational tool for understanding data privacy and personality analysis.
