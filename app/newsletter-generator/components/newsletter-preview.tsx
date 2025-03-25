"use client"

import { forwardRef } from "react"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

type NewsletterSection = {
  title: string
  content: string
  image: string
}

type NewsletterData = {
  title: string
  subtitle: string
  headerImage: string
  companyName: string
  companyLogo: string
  date: string
  greeting: string
  mainContent: string
  sections: NewsletterSection[]
  callToAction: {
    text: string
    url: string
  }
  footerText: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }
}

export const NewsletterPreview = forwardRef<HTMLDivElement, { data: NewsletterData; template: string }>(
  ({ data, template }, ref) => {
    const renderModernTemplate = () => (
      <div className="bg-white text-gray-800 max-w-full">
        {/* Header */}
        <div className="bg-blue-50 p-6 text-center">
          {data.companyLogo && (
            <img
              src={data.companyLogo || "/placeholder.svg"}
              alt={data.companyName}
              className="h-12 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-2xl font-bold text-blue-800">{data.title}</h1>
          <p className="text-blue-600 mt-1">{data.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{data.date}</p>
        </div>

        {/* Header Image */}
        {data.headerImage && (
          <div className="w-full">
            <img src={data.headerImage || "/placeholder.svg"} alt="Header" className="w-full h-48 object-cover" />
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <p className="font-medium text-lg">{data.greeting}</p>
          <p className="mt-4 leading-relaxed">{data.mainContent}</p>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {data.sections.map((section, index) => (
              <div key={index} className="border-t pt-6">
                <h2 className="text-xl font-bold text-blue-800">{section.title}</h2>
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                  {section.image && (
                    <div className="md:w-1/3">
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        className="w-full rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div className={section.image ? "md:w-2/3" : "w-full"}>
                    <p className="leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <a
              href={data.callToAction.url}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
            >
              {data.callToAction.text}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-600">{data.footerText}</p>

          <div className="flex justify-center mt-4 space-x-4">
            {data.socialLinks.facebook && (
              <a
                href={data.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {data.socialLinks.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} {data.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    )

    const renderClassicTemplate = () => (
      <div className="bg-white text-gray-800 max-w-full">
        {/* Header */}
        <div className="bg-gray-200 p-6">
          <div className="flex justify-between items-center">
            {data.companyLogo ? (
              <img
                src={data.companyLogo || "/placeholder.svg"}
                alt={data.companyName}
                className="h-12 object-contain"
              />
            ) : (
              <h2 className="text-xl font-bold">{data.companyName}</h2>
            )}
            <p className="text-sm text-gray-600">{data.date}</p>
          </div>
        </div>

        {/* Title */}
        <div className="border-b border-gray-300 p-6 text-center">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-gray-600 mt-1">{data.subtitle}</p>
        </div>

        {/* Header Image */}
        {data.headerImage && (
          <div className="w-full">
            <img src={data.headerImage || "/placeholder.svg"} alt="Header" className="w-full h-48 object-cover" />
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <p className="font-medium">{data.greeting}</p>
          <p className="mt-4 leading-relaxed">{data.mainContent}</p>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {data.sections.map((section, index) => (
              <div key={index} className="border-t pt-6">
                <h2 className="text-xl font-bold">{section.title}</h2>
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                  {section.image && (
                    <div className="md:w-1/3">
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        className="w-full rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div className={section.image ? "md:w-2/3" : "w-full"}>
                    <p className="leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <a
              href={data.callToAction.url}
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-900"
            >
              {data.callToAction.text}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-200 p-6">
          <p className="text-gray-600">{data.footerText}</p>

          <div className="flex mt-4 space-x-4">
            {data.socialLinks.facebook && (
              <a
                href={data.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {data.socialLinks.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} {data.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    )

    const renderMinimalTemplate = () => (
      <div className="bg-white text-gray-800 max-w-full">
        {/* Header */}
        <div className="p-6 text-center">
          {data.companyLogo && (
            <img
              src={data.companyLogo || "/placeholder.svg"}
              alt={data.companyName}
              className="h-10 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-2xl font-light">{data.title}</h1>
          <p className="text-gray-500 mt-1">{data.subtitle}</p>
          <p className="text-xs text-gray-400 mt-2">{data.date}</p>
        </div>

        {/* Header Image */}
        {data.headerImage && (
          <div className="w-full px-6">
            <img
              src={data.headerImage || "/placeholder.svg"}
              alt="Header"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <p className="font-light text-lg">{data.greeting}</p>
          <p className="mt-4 leading-relaxed text-gray-700">{data.mainContent}</p>

          {/* Sections */}
          <div className="mt-8 space-y-12">
            {data.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-light">{section.title}</h2>
                <div className="mt-4 flex flex-col md:flex-row gap-6">
                  {section.image && (
                    <div className="md:w-1/3">
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        className="w-full rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div className={section.image ? "md:w-2/3" : "w-full"}>
                    <p className="leading-relaxed text-gray-700">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <a
              href={data.callToAction.url}
              className="inline-block border border-gray-300 text-gray-800 px-6 py-3 rounded-md font-light hover:bg-gray-50"
            >
              {data.callToAction.text}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center border-t">
          <p className="text-gray-500 text-sm">{data.footerText}</p>

          <div className="flex justify-center mt-4 space-x-6">
            {data.socialLinks.facebook && (
              <a
                href={data.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {data.socialLinks.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} {data.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    )

    const renderBoldTemplate = () => (
      <div className="bg-white text-gray-800 max-w-full">
        {/* Header */}
        <div className="bg-purple-800 text-white p-6 text-center">
          {data.companyLogo && (
            <img
              src={data.companyLogo || "/placeholder.svg"}
              alt={data.companyName}
              className="h-12 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-purple-200 mt-1">{data.subtitle}</p>
          <p className="text-sm text-purple-300 mt-2">{data.date}</p>
        </div>

        {/* Header Image */}
        {data.headerImage && (
          <div className="w-full">
            <img src={data.headerImage || "/placeholder.svg"} alt="Header" className="w-full h-56 object-cover" />
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <p className="font-bold text-xl text-purple-800">{data.greeting}</p>
          <p className="mt-4 leading-relaxed">{data.mainContent}</p>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {data.sections.map((section, index) => (
              <div key={index} className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-800">{section.title}</h2>
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                  {section.image && (
                    <div className="md:w-1/3">
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        className="w-full rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div className={section.image ? "md:w-2/3" : "w-full"}>
                    <p className="leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <a
              href={data.callToAction.url}
              className="inline-block bg-purple-800 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-purple-900"
            >
              {data.callToAction.text}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white p-6 text-center">
          <p>{data.footerText}</p>

          <div className="flex justify-center mt-4 space-x-4">
            {data.socialLinks.facebook && (
              <a
                href={data.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
            )}
            {data.socialLinks.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                <Twitter className="h-6 w-6" />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
            {data.socialLinks.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-400">
            © {new Date().getFullYear()} {data.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    )

    const renderTemplate = () => {
      switch (template) {
        case "modern":
          return renderModernTemplate()
        case "classic":
          return renderClassicTemplate()
        case "minimal":
          return renderMinimalTemplate()
        case "bold":
          return renderBoldTemplate()
        default:
          return renderModernTemplate()
      }
    }

    return (
      <div ref={ref} className="bg-white">
        {renderTemplate()}
      </div>
    )
  },
)

NewsletterPreview.displayName = "NewsletterPreview"

