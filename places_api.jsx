import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const apiKey = "add yours";
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full relative">
                <label className="lg:text-right lg:w-1/3">Address</label>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
                  <Autocomplete
                    onLoad={(auto) => setAutocomplete(auto)}
                    onPlaceChanged={handlePlaceSelect}
                    className="border-gray-400 p-2 border rounded lg:ml-8 lg:w-2/3 text-black"
                  >
                    <input
                      type="text"
                      name="eventAddress"
                      placeholder="Enter the event address"
                      className="w-full text-black bg-transparent outline-none focus:outline-none focus:ring-0"
                      value={formData.eventAddress}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          eventAddress: e.target.value,
                        });
                        setPlaceExists(null);
                        if (errors.eventAddress) {
                          setErrors((prev) => ({ ...prev, eventAddress: "" }));
                        }
                      }}
                      maxLength={120}
                    />
                  </Autocomplete>
                  <div className="absolute mt-[4rem] lg:ml-[18rem] xl:ml-[22rem] text-sm">
                    {errors.eventAddress && <p className="text-red-500">{errors.eventAddress}</p>}
                    {placeExists === false && (
                      <p className="text-red-500 mt-3">❌ This place does not exist!</p>
                    )}
                    {placeExists === true && (
                      <p className="text-green-500 mt-3">✅ Place exists!</p>
                    )}
                  </div>
                </LoadScript>
              </div>
